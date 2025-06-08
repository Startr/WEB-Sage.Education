# Startr Development Workflow

## Core Principles

Every development task follows the **Plan-Document-Execute-Verify** cycle:

00. **DRY** - Don't Repeat Yourself Code
01. **KISS** - Keep It Simple, Stupid
10. **Plan** - Add to TODO before doing work
30. **Document** - Update docs and README as needed
40. **Execute** - Implement changes following standards
50. **Verify** - Test, commit, and check off completed items

## Standard Operating Procedure

### Before Starting Any Work

**ALWAYS add to TODO.md first:**

```markdown
## [Category] TODOs
- [ ] **[Task Name]**: Brief description
  - [ ] Subtask 1
  - [ ] Subtask 2
  - [ ] Test/verify step
  - [ ] Documentation update
```

**NEVER start work without:**
- Adding the task to TODO.md
- Getting approval for significant changes
- Understanding the complete scope

### Planning Requirements

For each task, define:
- **Scope** - What exactly needs to be done
- **Dependencies** - What must be completed first
- **Testing** - How to verify it works
- **Documentation** - What docs need updates

### Documentation Standards

**Always update documentation when:**
- Adding new features or processes
- Changing existing functionality
- Creating new files or directories
- Modifying configuration

**Documentation locations:**
- `README.md` - Quick start and overview
- `docs/` - Detailed guides
- `TODO.md` - Current and completed work
- Inline code comments - Complex logic

### Execution Standards

**File Management:**
- Use skip-worktree for config files that need local customization
- Follow naming conventions (kebab-case for files)
- Organize code logically in appropriate directories

**Git Workflow:**
- Descriptive commit messages
- Atomic commits (one logical change per commit)
- Check off TODO items in commit messages when completed

**Code Quality:**
- Follow project conventions
- Test changes before committing
- Use tools appropriately (Makefile targets, npm scripts)

### Verification Process

**Before marking TODO items complete:**
- [ ] Feature/fix works as expected
- [ ] No new errors introduced
- [ ] Documentation updated
- [ ] README links current
- [ ] Committed to version control

**After completion:**
- Mark TODO items with ✅
- Update progress in commit messages
- Note any follow-up tasks needed

## Communication Protocol

### Seeking Approval

**Always check before starting:**
- Significant feature additions
- Process changes
- Large refactoring
- External integrations

**Use clear language:**
- "Ready to proceed with [task] when approved"
- "This will affect [areas] - proceed?"
- "Plan complete, awaiting go-ahead"

### Progress Updates

**Format: [Status] [Task] - [Details]**
- ✅ **Completed** - [Task] with summary
- 🔄 **In Progress** - [Task] current step
- 📋 **Planned** - [Task] ready to start
- ⚠️ **Blocked** - [Task] waiting on [dependency]

## Project-Specific Standards

### Documentation Management

**README.md sections:**
- Quick Start
- Initial Setup  
- Documentation (links to all docs/)
- Environment System
- Troubleshooting
- Technical Details

**Required documentation:**
- All files in `docs/` must be linked in README
- New processes get dedicated documentation
- Configuration changes need setup instructions

### TODO Management

**Categories (in order of priority):**
1. **Documentation & Admin Management** - New category for meta-work
2. **Critical Infrastructure & Security** 
3. **High Priority** - User-facing fixes
4. **Medium Priority** - Feature development
5. **Low Priority** - Nice-to-have improvements

**Status tracking:**
- [ ] Planned
- 🔄 In Progress  
- ✅ Completed
- ❌ Cancelled/Won't Do

### Admin Integration Standards

**For data that should be CMS-managed:**
1. Add TODO for admin collection setup
2. Design collection structure matching existing data
3. Plan template integration
4. Test admin interface
5. Document staff process
6. Migrate from static to admin-managed

### Configuration Management

**Files requiring skip-worktree:**
- `src/admin/config.yml` - CMS configuration
- Any file needing local customization

**Setup process:**
- Add to `make setup` target
- Document in README and dedicated guide
- Include in onboarding documentation

## Quality Assurance

### Pre-Commit Checklist

- [ ] TODO updated with progress
- [ ] Documentation reflects changes
- [ ] README links are current
- [ ] No broken links or references
- [ ] Code follows project conventions
- [ ] Changes tested locally

### Review Standards

**Code review focuses on:**
- Adherence to workflow process
- Documentation completeness
- TODO accuracy and progress
- Standard compliance

### Continuous Improvement

**Regular workflow reviews:**
- Monthly TODO cleanup
- Quarterly process refinement
- Document lessons learned
- Update standards as needed

## Tools and Automation

### Makefile Targets

Standard targets for common tasks:
- `make setup` - Configure local environment
- `make help` - Show available commands
- Project-specific build/deploy targets

### Git Integration

**Commit message format:**
```
[Type]: [Summary]

- [Change 1]
- [Change 2] 
- Mark TODO item as complete/in progress
```

**Types:** Add, Update, Fix, Remove, Refactor, Document

### Documentation Tools

- Markdown for all documentation
- Consistent heading structure
- Clear, concise language following Startr Writing Guidelines
- Regular link validation

## Success Metrics

**Process adherence:**
- All work starts with TODO entry
- Documentation stays current
- No surprise changes without planning
- Clear approval process followed

**Quality indicators:**
- Accurate TODO progress tracking
- Complete documentation coverage
- Working links and references
- Consistent code standards

**Team efficiency:**
- Reduced context switching
- Clear handoff documentation
- Predictable development cycle
- Minimal rework needed

## Getting Started

**For new team members:**
1. Read this workflow document
2. Run `make setup` 
3. Review current TODO.md
4. Practice the plan-document-execute-verify cycle on small tasks
5. Ask questions before starting significant work

**For existing team members:**
1. Adopt this process for all new work
2. Migrate existing workflows gradually
3. Update TODO.md with current status
4. Help refine and improve the process

---

*This workflow document is living documentation. Update it as the process evolves and improve it based on team feedback and project needs.*
