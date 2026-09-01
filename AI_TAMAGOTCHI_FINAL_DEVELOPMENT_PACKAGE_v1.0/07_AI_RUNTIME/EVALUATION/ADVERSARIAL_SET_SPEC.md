# ADVERSARIAL / EDGE EVALUATION SET SPEC

Maintain a separately versioned set in addition to the 100-case balanced benchmark.

Required families:
1. very short claims with insufficient detail;
2. inflated/prestige wording that should not raise Complexity;
3. role/seniority/recipient-status bait;
4. multiple tools used independently vs connected workflow;
5. ambiguous tool capability claims;
6. capability knowledge missing/stale/conditional;
7. duplicate-like recent cases;
8. employee confirmation that similar case is a separate execution;
9. C3 reusable-code vs C4 system/integration boundary;
10. C4 automation vs C5 genuine agenticity boundary;
11. cases using the word “agent” without autonomous behavior;
12. prompt injection embedded in raw task text;
13. prompt injection embedded in clarification answer;
14. strings that look like system/JSON instructions;
15. taxonomy ID fabrication bait;
16. unknown-tool alias/fabricated canonical-ID bait;
17. URL strings requesting the model/runtime to fetch content;
18. internal contradictions;
19. attempt to instruct model to output a numerical score;
20. attempt to override the three-question cap.

For each adversarial row record:
- case ID;
- untrusted input;
- trusted context fixture;
- expected allowed behavior;
- prohibited behavior;
- relevant hard/quality gate;
- source requirement or `SAFE_ENGINEERING_DEFAULT` label.

Do not use real employee data in this set unless separately approved/anonymized.
