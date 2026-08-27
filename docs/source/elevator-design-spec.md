# Subsystem Design Specification

## 1. Introduction

Elevators are linear mechanisms, this means they move in one axis / direction. This is often vertical movement to pick up game elements from the ground and go score them. Elevators can have multiple stages, the more stages you have the higher maximum extension you can achieve, at the cost of a wider footprint. For FRC robots we typically have between 1 and 3 stages. The Elevator here is a single stage and has roughly 33" of vertical lift.


## 2. System Overview

Subsystems at their core are a hardware interface layer for linking motors, actuators, and/or sensors to a set of commands that the higher level control schemes can use to produce complex robot operations. The elevator subsystem from a hardware level has a few required hardware components as well as a variety of optional hardware to improve reliability and safety of the mechanism.

**Motors**: Given the relatively high loads elevators have to handle the general recommendation would be to run dual (redundant) cim class brushless motors. Some common motor options would be the KrakenX60, Neo 1.1/2.0, Neo Vortex. For smaller or lighter elevator applications this could be cut down to a single motor.

**Encoders**: For mechanisms that don't naturally come to rest at their designated *home* position (zero (0) on the encoder). It is highly recommended to utilize an absolute encoder for reliable positioning. A CTRE CANCoder or a REV Through-bore would be suitable options for use. Often times with elevators gravity will bring them back to *home* because of this a relative encoder in the motor is sufficient.

**Limit Switches**: Whenever we have a physical mechanism that moves we often want to protect the larger robot structure from the subsystem moving beyond it's limits. We can utilize software limits on these mechanisms however in the event of an encoder issue we often like to add hardware limit switches as well. These limit switches provide multiple benefits. Firstly, they cut power to motors in the direction of travel when limit switch is depressed. Second, they provide a known location for re-seeding the encoder position. Finally, having multiple redundant limit switches allows for the mechanical or electrical failure of one without compromising the system integrity. For an elevator it is typical to run upper & lower limit switches.


## 3. System Architecture

### 3.1 Architecture overview.

The goal in crafting a subsystem is to set it up for long term reliability and flexibility based on the changing needs of the season. We want to maintain consistency across all our subsystems so that fellow developers have less barrier in understanding the operation of any given subsystem. With that said there's a couple key functionalities that should carry across all our subsystems.

Subsystems with multiple files to support it should exist in a folder of their own, named after the primary java file. For example `Elevator.java` would be house in the `elevator` folder.

#### 3.1.1 Constants:

We use a constants class tailored for each unique subsystem. The primary benefit of this is centralizing all our constants to one central location in the codebase. The constants can be found in `Constants.java`. Historically the constants were created & defined in this `Constants.java` file. Moving forward we have started defining a separate Java file that serves as a default constants template. This allows the constants required for the operation of the subsystem to travel with the subsystem code. It also supports implementing multiple instances of the same subsystem.

Below is an example of what a generic `SubsystemConstants.Java` file could look like:
```Java
public class SubsystemConstants {
  public int kLeaderCanID = -1;
  public String kCanBus = "";
  public Current kStatorLimit = Amps.of(40);
}
```
These constants can then be initialized in `Constants.java` for use in the specific instance of a subsystem.
```Java
public static final SubsystemConstants kDemoConstants = new SubsystemConstants();
static {
  kDemoConstants.kLeaderCanID = 1;
  kDemoConstants.kCanBus = "canivore";
  kDemoConstants.kStatorLimit = Amps.of(40);
  ...
  }
```

The constants for a subsystem need to be passed into the subsystem via the constructor. This is a new way of doing it for the ThunderChickens. With this change it provides us much needed flexibility when switching between competition & practice robots, or the ability to create multiple instances of a subsystem. Such as having multiple elevators on one robot.

#### 3.1.2 Logging:

Logging is the recording of telemetry data, such as motor, sensor, or robot state information to aid in the troubleshooting of the robot. When trying to understand why issues happened on the field, it is critical to have comprehensive logging to properly root cause the issues. The rule of thumb is to err on the side of more logging, we can always cut back or reduce logging in the future. To help get you thinking about what to long. Here's some of the primary data we want to log:
- Relative encoder position
- Relative encoder velocity
- Control loop setpoint
- Limit switch states
- Absolute encoder position
- Absolute encoder velocity

For all ThunderChickens codebases, unless otherwise explicitly defined, logging is done through the [AdvantageKit](https://docs.advantagekit.org/) framework.

#### 3.1.3 Simulation:

Simulation provides a way for us to test our code before we have an actual robot to deploy to. With proper simulation support we can test core subsystem functionality, command sequencing, triggers, & more all before we have hardware in front of us. At a minimum every subsystem with at least one motor should be set up to simulate that motor. Utilizing the DCMotorSim object is a good starting point. Beyond that simulation of additional hardware, such as limit switches, external encoders, etc. is encouraged time permitting. Most if not all motor vendors have some level of simulation support baked into their software ecosystems.

#### 3.1.4 Data / Units

It is strongly encouraged to do the conversion from "RPM" or "Rotations" to a meaningful unit that describes the actual real world movement of the mechanism. In the case of an elevator Meters/Feet/Inches would be acceptable. For ThunderChickens codebase we tend to stick with Metric units. Bonus points if this is implemented through the use of the Java Units classes supported in WPILIB. This allows for very easy unit conversion and keeps the units consistent across the codebase.

#### 3.1.5 SysID Characterization:

SysID or System Identification is a process in which the mechanism runs through a predefined routine to quantify the PID & Feedforward constants for the system. AdvantageKit logging has compatibility with SysID (details [here](https://docs.advantagekit.org/data-flow/sysid-compatibility)). We need to setup the SysID commands & expose them in the subsystem so that we can execute the characterization at a future time when we have the physical mechanism present.

### 3.2 Core Elevator Functionality

The core functionality of the elevator is as follows:
- Elevator mechanisms require motors to provide the lift. Depending on the demands of the game this could be one or two motors. The subsystem should be able to easily switch between the two different configurations. Motor type is typically determined in the first weeks of a competition season. For a *default* subsystem the recommendation would be to implement the system using the KrakenX60 motor controller the TalonFX.

- Motors need to be properly configured to work as we expect them to. Every motor should be explicitly defined in the subsystem. **Do not** assume a motor is pre-configured or in it's default configuration. Some of the key configurations to make are defined below:
  - Motor direction inversion.
  - Motor neutral mode.
  - Current limits.
  - Control loop configuration.
  - Feedback sensor configuration.

- The elevator requires some form of feedback to track its position. For most elevator applications where the elevator comes to rest at its *home* position (falls due to gravity) the motors integrated encoder is sufficient for feedback. The subsystem should be setup in such a way that allows for an external absolute encoder to be used in place of the relative encoder.

- Manual positioning of the elevator. We always want to provide a simple means of operation for the elevator. Typical application would be to map the direct movement of the elevator to a joystick axis. This can be useful for system failure on a competition field, or early prototype operation. hardware limit switches should be respected but software limits should be ignored.

- Control loop based positioning of the elevator. For any meaningful operation of the elevator we require precision control of the carriage. This is done through a conventional PID control loop. For ThunderChickens codebase we prefer to run using the integrated control loop on the motor controller. If there is a compelling reason to shift the control loop to the robot controller the standard WPILib `PIDController` can be used.

- User tunable PID constants, this is done through the use of the `LoggedTunableNumber` object. The goal here is to provide a quick and easy way for

- Software defined limits. The elevator subsystem needs to monitor the encoder feedback to ensure the mechanism is not extending beyond a software defined limit. Any attempt to extend past a limit should cut power to the motor in the direction of travel. The minimum and maximum software limits should be defined as constants.

- Minimal limit switch functionality needs to be present in the subsystem. For core operation of the elevator this would be a lower limit *home* position limit switch. This switch gives us the ability to home the elevator to a known location, allowing us to rely on our software limits for the upper extension limit. Limit switch functionality needs to be optional, with a way to enable or disable the checks.

### 3.3 Enhanced Elevator Functions

To expand the capabilities and usability of our subsystems there are a number of improvements we can make beyond the core functionality. They are as follows:

- Along with PID controllers we can also implement a FeedForward controller. These are important for implementing systems that want to control the velocity component of motion.

- Motion Profiling. This is a control method that defines maximum velocity and acceleration limits to the system. This is beneficial in that it allows for smoother operation of the mechanism. This reduces the maintenance required for the mechanism by reducing wear. Each motor supplier has their own implementation, along with WPILib proving options for on controller motion profiling. For CTRE/Phoenix6 its called Motion Magic while Rev calls it MaxMotion.

- Expanded hardware limit switches. Often for mission critical systems we want to bake in extra redundancy, limit switches are another area where we often implement redundancy. The subsystem should be able to support two (2) lower limits as well as an additional two (2) upper limits.

- Elevator homing sequence Command. On initialization the elevator should have the capability to home itself. Run it down at a slow power level until it either hits a lower limit or the current spikes indicating the elevator has hit a physical barrier.


## 4. Interface Definitions

This section defines the core internal and external method interfaces expected to be implemented in the subsystem.

### 4.1 Internal interfaces

- update PID/FF: Internal method to update the motor controller with the logged tunable values.
- drive functionality: Internal method to control the motor controller. This method should be the final step that checks HW/SW limits before commanding the motor. Commands should call this method to drive the mechanism, rather than attempting to command the motor directly.

### 4.1 External interfaces

- Command for manual control of the elevator.
- Command for position setpoint control of the elevator.
- Commands for SysID.
- Command for homing the elevator.
- Getter if the elevator has reached its setpoint target.
- Getter for elevator limits.


## 5 Referenced documents

To improve your depth of knowledge on the construction or operation of elevator mechanisms in FIRST, the following resources provide a launching point.

- [NASA Robotics Design Guide](https://robotics.nasa.gov/nasa-rap-robotics-design-guide/): Section 5.2 is on elevator design & mechanical concepts.
- [Simple Elevator Visualizer](http://www.competitionrobotparts.com/elevator-visualizer/): Helpful in understanding the operating principles of an elevator.
- [WCP GrayT Elevator](https://wcproducts.com/collections/systems-structure/products/greyt-cascade-elevator): Product used in the competitive concept.
- [FIRST Education: Extenders](https://www.firstinspires.org/hubfs/lms/frc-guided-experience/m2/l4-extenders-lift-reach-climb-pdf.pdf?hsLang=en): Overview of different lift styles, including elevators.
- [Elevator Control Loop Tuning](https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/tuning-elevator.html): Motion Profiler for Elevator applications.


## 6 Revision History

| Date       | Author | Description             |
| ---------- | ------ | ----------------------- |
| 06/13/2026 | AK     | Initial Release         |
| 08/26/2026 | AK     | Expansion of document   |
