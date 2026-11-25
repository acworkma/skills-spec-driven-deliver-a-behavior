// Decides whether a subscriber may see one claim of a dependent.
// The approved rules are in openspec/changes/implement-dependent-privacy/specs/member-claim-privacy/spec.md.
export function canViewDependentClaim({ age, confidential, sensitive }) {
  if (!Number.isInteger(age) || age < 0) return false;
  if (typeof confidential !== 'boolean' || typeof sensitive !== 'boolean') return false;
  if (confidential || age >= 18) return false;
  if (age < 13) return true;
  return !sensitive;
}
