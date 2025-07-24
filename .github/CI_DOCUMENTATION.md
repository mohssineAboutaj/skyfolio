# GitHub Actions CI/CD Documentation

This directory contains GitHub Actions workflows for automated testing and quality assurance of the Skyfolio project.

## Workflows

### `test.yml` - Main Test Suite

- **Triggers**: Push to main/master/develop, Pull Requests
- **Purpose**: Runs the complete test suite
- **Features**:
  - Installs dependencies with `npm ci`
  - Runs all tests (`npm run test:all`)
  - Uploads test results as artifacts
  - Generates coverage reports

### `pr-check.yml` - Pull Request Quality Check

- **Triggers**: Pull Requests to main/master/develop
- **Purpose**: Quality assurance for PRs
- **Features**:
  - Runs unit and E2E tests separately
  - Generates coverage reports
  - Comments on PRs with test results
  - Provides detailed feedback

## Quick Setup

### 1. Enable GitHub Actions

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Enable "Allow all actions and reusable workflows"
4. Save the changes

### 2. Set up Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch
3. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Select the test workflows as required status checks

## Test Results

### Coverage Reports

- Coverage reports are generated automatically
- Available as downloadable artifacts
- Can be integrated with Codecov for better visualization

### Test Artifacts

- Test results are uploaded as artifacts
- Available for 30 days
- Can be downloaded from the Actions tab

## Customization

### Adding New Test Scripts

If you add new test scripts to `package.json`, update the workflows:

```yaml
- name: Run new tests
  run: npm run test:new-script
```

### Modifying Triggers

To change when workflows run, modify the `on` section:

```yaml
on:
  push:
    branches: [main, develop, feature/*]
  pull_request:
    branches: [main]
```

## Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**

   - Check Node.js version compatibility
   - Verify all dependencies are in `package-lock.json`
   - Ensure environment variables are set

2. **Performance issues**
   - Tests taking too long: Check for infinite loops
   - Memory issues: Consider increasing Node.js memory limit
   - Timeout issues: Increase timeout in workflow

### Debug Workflows

1. Go to **Actions** tab in your repository
2. Click on the failed workflow
3. Click on the failed job
4. Check the logs for error messages

## Monitoring

### Workflow Status

- Monitor workflow runs in the **Actions** tab
- Set up notifications for failed workflows
- Use GitHub's built-in status checks

### Performance Metrics

- Track test execution time
- Monitor coverage trends
- Set up alerts for performance regressions

## Security

### Best Practices

- Never commit secrets to the repository
- Use GitHub's built-in secret management
- Regularly rotate API tokens
- Review workflow permissions

### Security Scanning

The CI includes:

- `npm audit` for dependency vulnerabilities
- Regular dependency updates

## Contributing

### Adding New Workflows

1. Create new `.yml` file in `.github/workflows/`
2. Follow the existing workflow structure
3. Test locally before pushing
4. Document the workflow purpose

### Modifying Existing Workflows

1. Test changes in a feature branch
2. Update documentation if needed
3. Consider backward compatibility
4. Notify team of changes

---

For more information, see the [GitHub Actions documentation](https://docs.github.com/en/actions).
