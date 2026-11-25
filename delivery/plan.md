# Delivery plan

| Scenario ID | Requirement | Code to change | Unit test name | Gherkin scenario |
| --- | --- | --- | --- | --- |
| 001-US3-AS1 | 001-FR-011: Show routine claims and hide sensitive claims for a dependent aged 13 through 17. | `src/claim-visibility.js` | 001-US3-AS1: show routine adolescent claims and hide sensitive claims | none |
| 001-US3-AS2 | 001-FR-011: Fail closed when a dependent's privacy facts are unknown. | `src/claim-visibility.js` | 001-US3-AS2: hide claims when confidential status is unknown | none |
| 001-US3-AS3 | 001-FR-011: Hide every claim when the dependent has a confidential communication request, so the list matches an empty list. | `src/claim-visibility.js` | 001-US3-AS3: confidential child list matches an empty claim list | A confidential child looks like a child with no claims |
| 001-US3-AS4 | 001-FR-012: Hidden sensitive claims must not change any list field, count, or billed total. | `src/claim-visibility.js` | 001-US3-AS4: sensitive adolescent claim leaves the list response unchanged | A sensitive adolescent claim leaves no trace in the list |
| 001-US3-AS5 | 001-FR-012: Adult claims must remain hidden, and the adult privacy message must not reveal whether claims exist. | `src/claim-visibility.js` | 001-US3-AS5: adult list and privacy message are unchanged by claims | An adult dependent's privacy message reveals no claims |
| 001-US3-AS6 | 001-FR-013: A direct lookup of a hidden claim must be indistinguishable from a missing claim. | `src/claim-visibility.js` | 001-US3-AS6: hidden claim lookup matches a missing claim lookup | A hidden claim looks like a claim that does not exist |

## Conflicts and open questions

- No conflicts were found among the approved change, Gherkin feature, step definitions, and `src/claim-status.js`.
- `001-US3-AS1` and `001-US3-AS2` have no Gherkin scenarios tagged with their IDs and are therefore planned for unit-test coverage only.
- `001-FR-013` also requires authenticated-subscriber enforcement, but no `#### Scenario:` ID exercises that authorization boundary; confirm whether additional unit-test coverage is sufficient or a new approved scenario is required.

## Human review

Reviewed by: Tester
Decision: Approved for test-first implementation
Checked: one row per scenario ID; only src/claim-visibility.js changes; no spec or feature edits