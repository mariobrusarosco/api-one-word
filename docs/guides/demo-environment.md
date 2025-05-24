# Demo Environment Management

This guide explains how to manage the demo environment, including the automated reset functionality.

## Reset Demo Endpoint

### Overview
- **Endpoint**: `POST /api/v1/admin/reset-demo`
- **Environment**: Only available when `NODE_ENV=demo`
- **Authentication**: Requires a valid `DEMO_RESET_TOKEN`

### Authentication

#### Generating a Secure Token

1. **Generate a secure random token**:
   ```bash
   # On Linux/macOS
   openssl rand -hex 32
   
   # On Windows (PowerShell)
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

2. **Set the token in your environment**:
   - **Demo Environment**: Set in your hosting provider's environment variables as `DEMO_RESET_TOKEN`
   - **GitHub Actions**: Add as a repository secret named `DEMO_RESET_TOKEN` for the automated workflow

3. **Using the token**:
   ```http
   POST /api/v1/admin/reset-demo
   Authorization: Bearer your_generated_token_here
   Content-Type: application/json
   ```

## Automated Reset

### GitHub Actions Workflow

The demo environment can be automatically reset using the GitHub Actions workflow:

- **Location**: `.github/workflows/reset-demo.yml`
- **Schedule**: Runs daily at 05:00 UTC
- **Manual Trigger**: Available in GitHub Actions UI

### Required Secrets

| Secret Name         | Description                                      |
|---------------------|--------------------------------------------------|
| `DEMO_RESET_TOKEN`  | Authentication token for the reset endpoint      |


## Security Considerations

1. **Token Security**:
   - Never commit the token to version control
   - Rotate the token periodically
   - Only share with authorized personnel
   - Use the principle of least privilege

2. **Endpoint Security**:
   - Only available in demo environment
   - Requires authentication
   - Rate limiting is recommended

## Troubleshooting

- **403 Forbidden**: Check if `NODE_ENV` is set to 'demo' and the token is correct
- **401 Unauthorized**: Verify the token in the Authorization header
- **Endpoint not found**: Ensure the application is running in demo mode
