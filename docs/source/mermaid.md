*Figure 1:* Example Git branching with ThunderChickens branch naming applied. 
```mermaid
---
config:
  logLevel: 'debug'
  theme: 'dark'
  gitGraph:
    showBranches: true
    showCommitLabel: false
    mainBranchName: 'main'
---
gitGraph
	commit
	branch "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\FEATURE"
	checkout "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\FEATURE"
	commit
	commit
	commit
	checkout "main"
	merge "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\FEATURE"
	commit
	branch "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\BUG_FIX"
	checkout "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\BUG_FIX"
	commit
	commit
	commit
	checkout "main"
	merge "user\\LASTNAME.FIRSTNAME\\TARGET_ROBOT\\BUG_FIX"
	commit
	branch "comp\\COMP_ID"
	checkout "comp\\COMP_ID"
	commit
	commit
	branch "comp\\COMP_ID\\MATCH_ID"
	checkout "comp\\COMP_ID\\MATCH_ID"
	commit
	commit
	commit
	checkout "comp\\COMP_ID"
	merge "comp\\COMP_ID\\MATCH_ID"
	commit
	checkout "main"
	merge "comp\\COMP_ID"
	
````
