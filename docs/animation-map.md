# Animation map

The bundled pet uses Codex sprite version 2: an 8-column by 11-row,
1536×2288 WebP spritesheet.

| Row | State | Frames | Typical trigger |
| ---: | --- | ---: | --- |
| 0 | Idle | 6 | No active task |
| 1 | Fly right | 8 | Drag right |
| 2 | Fly left | 8 | Drag left |
| 3 | Wave | 4 | First-awake greeting |
| 4 | Jump | 5 | Hover over the pet |
| 5 | Failed | 8 | Failed or blocked task |
| 6 | Waiting | 6 | Approval or user input required |
| 7 | Working | 6 | Active task |
| 8 | Review | 6 | Completed output ready |
| 9–10 | Look directions | 16 | Pointer position around the pet |

The final cell of the idle row repeats the first frame to close the loop. Empty
cells are transparent.
