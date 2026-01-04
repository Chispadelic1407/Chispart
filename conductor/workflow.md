# Development Workflow

## Overview

This document defines the development workflow for the Chispart project. Following this workflow ensures consistency, quality, and maintainability across all development activities.

## Core Principles

1. **Quality First**: Prioritize code quality and maintainability over speed
2. **Test-Driven**: Write tests before or alongside implementation
3. **Incremental Progress**: Make small, focused commits frequently
4. **Documentation**: Keep documentation up-to-date with code changes
5. **Code Review**: All changes should be reviewable and understandable

## Development Cycle

### 1. Task Planning

**Before Starting Any Task:**
- Read and understand the task requirements completely
- Review related code and documentation
- Identify dependencies and potential blockers
- Break down complex tasks into smaller subtasks
- Estimate effort and complexity

### 2. Implementation

**Development Process:**

1. **Create Feature Branch** (if using Git flow)
   ```bash
   git checkout -b feature/task-description
   ```

2. **Write Tests First** (Test-Driven Development)
   - Write failing tests that define expected behavior
   - Run tests to confirm they fail
   - Implement minimum code to make tests pass
   - Refactor while keeping tests green

3. **Implement Feature**
   - Follow code style guides strictly
   - Write clean, self-documenting code
   - Add comments only when necessary to explain "why"
   - Keep functions small and focused
   - Follow SOLID principles

4. **Manual Testing**
   - Test the feature in the browser (for frontend changes)
   - Test API endpoints (for backend changes)
   - Verify responsive design on multiple screen sizes
   - Test edge cases and error scenarios

5. **Code Quality Checks**
   - Run linter: `npm run lint`
   - Fix all linting errors
   - Ensure no console.log statements in production code
   - Check for unused imports and variables

### 3. Testing Requirements

**Test Coverage: Minimum 80%**

**Required Tests:**
- Unit tests for all business logic
- Component tests for React components
- Integration tests for API endpoints
- End-to-end tests for critical user flows

**Testing Commands:**
```bash
npm test                 # Run all tests
npm test -- --coverage   # Run with coverage report
npm test -- --watch      # Run in watch mode
```

**Test Quality Standards:**
- Tests should be independent and isolated
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test both success and failure scenarios

### 4. Commit Strategy

**Commit After Every Task**

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(catalog): add search functionality to project catalog"
git commit -m "fix(card): resolve hover animation glitch on mobile"
git commit -m "test(filter): add unit tests for category filtering"
git commit -m "docs(readme): update installation instructions"
```

**Commit Best Practices:**
- Make atomic commits (one logical change per commit)
- Write clear, descriptive commit messages
- Commit working code only
- Don't commit commented-out code
- Don't commit debug statements

### 5. Git Notes for Task Summaries

**Use Git Notes to Record Task Summaries**

After completing each task, add a Git note with a summary:

```bash
git notes add -m "Task Summary:
- Implemented search functionality
- Added debouncing for performance
- Updated tests to cover new feature
- Verified responsive design on mobile

Testing: All tests passing, 85% coverage
Browser Testing: Verified on Chrome, Firefox, Safari"
```

**View Git Notes:**
```bash
git log --show-notes
git notes show <commit-hash>
```

**Git Notes Template:**
```
Task Summary:
- [List of changes made]
- [Key decisions and rationale]
- [Any issues encountered and solutions]

Testing: [Test results and coverage]
Browser Testing: [Browsers tested]
Performance: [Any performance considerations]
```

## Phase Completion Verification and Checkpointing Protocol

**After Completing Each Phase:**

When a phase (group of related tasks) is completed, perform the following verification steps:

### 1. Code Quality Verification
- [ ] All linting errors resolved (`npm run lint`)
- [ ] No TypeScript errors (if applicable)
- [ ] Code follows style guides
- [ ] No commented-out code
- [ ] No debug statements (console.log, debugger)

### 2. Testing Verification
- [ ] All tests passing (`npm test`)
- [ ] Test coverage ≥ 80% (`npm test -- --coverage`)
- [ ] Manual testing completed
- [ ] Browser testing on major browsers
- [ ] Responsive design verified on mobile/tablet/desktop

### 3. Functionality Verification
- [ ] All phase requirements met
- [ ] Features work as expected
- [ ] No regressions in existing functionality
- [ ] Error handling implemented
- [ ] Edge cases handled

### 4. Documentation Verification
- [ ] Code comments added where necessary
- [ ] README updated if needed
- [ ] API documentation updated (if applicable)
- [ ] Git notes added for all commits

### 5. Performance Verification
- [ ] No performance regressions
- [ ] Page load times acceptable (<3 seconds)
- [ ] No memory leaks
- [ ] Optimizations applied where needed

### 6. Security Verification
- [ ] No security vulnerabilities introduced
- [ ] Input validation implemented
- [ ] No sensitive data exposed
- [ ] Dependencies up-to-date

### 7. Checkpoint Commit
After verification, create a checkpoint commit:

```bash
git add .
git commit -m "chore(phase): complete [Phase Name] - checkpoint

All verification steps completed:
- Code quality: ✓
- Testing: ✓ (85% coverage)
- Functionality: ✓
- Documentation: ✓
- Performance: ✓
- Security: ✓"

git notes add -m "Phase Checkpoint: [Phase Name]
All tasks in this phase completed and verified.
Ready to proceed to next phase."
```

## Code Review Guidelines

**Self-Review Checklist:**
- [ ] Code follows style guides
- [ ] Tests are comprehensive
- [ ] No unnecessary complexity
- [ ] Error handling is robust
- [ ] Performance is acceptable
- [ ] Documentation is clear
- [ ] Commit messages are descriptive

**Peer Review Focus:**
- Code correctness and logic
- Test coverage and quality
- Performance implications
- Security considerations
- Maintainability and readability
- Adherence to project conventions

## Continuous Integration

**Pre-Push Checks:**
```bash
# Run before pushing
npm run lint
npm test
npm run build
```

**Automated CI Pipeline:**
1. Lint check
2. Run all tests
3. Build application
4. Deploy to staging (if applicable)

## Branch Strategy

**Main Branches:**
- `main`: Production-ready code
- `develop`: Integration branch for features

**Supporting Branches:**
- `feature/*`: New features
- `fix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes

**Workflow:**
1. Create feature branch from `develop`
2. Implement and test feature
3. Merge back to `develop`
4. Periodically merge `develop` to `main` for releases

## Release Process

**Version Numbering:** Semantic Versioning (MAJOR.MINOR.PATCH)

**Release Steps:**
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create release branch
4. Final testing and verification
5. Merge to `main`
6. Tag release: `git tag -a v1.0.0 -m "Release v1.0.0"`
7. Deploy to production
8. Merge back to `develop`

## Emergency Procedures

**Hotfix Process:**
1. Create hotfix branch from `main`
2. Implement fix with tests
3. Fast-track review
4. Merge to both `main` and `develop`
5. Deploy immediately

**Rollback Process:**
1. Identify problematic commit
2. Create revert commit
3. Deploy previous stable version
4. Investigate and fix issue properly
5. Redeploy with fix

## Best Practices

### Do's
✅ Write tests before or with implementation
✅ Commit frequently with clear messages
✅ Keep commits atomic and focused
✅ Run tests before committing
✅ Update documentation with code changes
✅ Use Git notes for detailed task summaries
✅ Perform thorough self-review
✅ Test on multiple browsers and devices
✅ Handle errors gracefully
✅ Optimize for performance

### Don'ts
❌ Commit broken code
❌ Skip writing tests
❌ Make large, unfocused commits
❌ Leave commented-out code
❌ Ignore linting errors
❌ Push without running tests
❌ Commit sensitive data
❌ Use vague commit messages
❌ Skip documentation updates
❌ Ignore performance issues

## Tools and Commands

**Essential Commands:**
```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Quality
npm run lint            # Run linter
npm run lint:fix        # Fix linting errors
npm test                # Run tests
npm test -- --coverage  # Run tests with coverage

# Git
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit with message
git notes add -m "note" # Add git note
git log --show-notes    # View commits with notes
git push                # Push to remote
```

## Workflow Summary

1. **Plan**: Understand requirements, break down tasks
2. **Test**: Write tests first (TDD approach)
3. **Implement**: Write clean code following style guides
4. **Verify**: Run linter, tests, manual testing
5. **Commit**: Make atomic commit with clear message
6. **Document**: Add Git note with task summary
7. **Review**: Self-review before pushing
8. **Phase Checkpoint**: Verify all requirements after completing phase
9. **Push**: Push to remote after all checks pass
10. **Deploy**: Deploy to staging/production as needed

## Metrics and Goals

**Code Quality Metrics:**
- Test coverage: ≥ 80%
- Linting errors: 0
- Build warnings: 0
- Code duplication: < 5%

**Performance Metrics:**
- Page load time: < 3 seconds
- Time to interactive: < 5 seconds
- Lighthouse score: ≥ 90

**Development Metrics:**
- Commit frequency: Multiple per day
- Average commit size: < 200 lines
- Code review turnaround: < 24 hours

## Continuous Improvement

**Regular Reviews:**
- Weekly: Review workflow effectiveness
- Monthly: Update style guides and best practices
- Quarterly: Major workflow improvements

**Feedback Loop:**
- Collect feedback from team members
- Identify pain points and bottlenecks
- Implement improvements iteratively
- Document lessons learned

---

**Remember:** This workflow is designed to ensure quality and consistency. Follow it diligently, but also use common sense. If something doesn't make sense for a specific situation, discuss it with the team and update this document accordingly.
