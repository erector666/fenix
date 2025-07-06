# 🔐 Environment Variables - Quick Reference

## 🚀 Essential Variables (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `3000` |

## 🔥 Firebase (Recommended for Real-time)

| Variable | Description | Example |
|----------|-------------|---------|
| `FIREBASE_API_KEY` | Firebase API key | `AIzaSy...` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `my-project-123` |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `my-project.firebaseapp.com` |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `my-project.appspot.com` |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `123456789` |
| `FIREBASE_APP_ID` | Firebase app ID | `1:123456789:web:abc123` |

## 🗄️ Database Alternatives

### MongoDB
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/fenix_construction` |
| `MONGODB_URI_PROD` | Production MongoDB URI | `mongodb+srv://user:pass@cluster.mongodb.net/fenix_construction` |

### PostgreSQL
| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_HOST` | PostgreSQL host | `localhost` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DATABASE` | Database name | `fenix_construction` |
| `POSTGRES_USER` | Database user | `fenix_user` |
| `POSTGRES_PASSWORD` | Database password | `secure_password` |

## 🗺️ Google Maps

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | `AIzaSy...` |

## 🔐 Security

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing secret | `32-character-random-string` |
| `JWT_REFRESH_SECRET` | JWT refresh secret | `32-character-random-string` |
| `ENCRYPTION_KEY` | Encryption key | `32-character-random-string` |
| `ENCRYPTION_IV` | Encryption IV | `16-character-random-string` |

## 📧 Optional Services

### SendGrid (Email)
| Variable | Description | Example |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | SendGrid API key | `SG...` |
| `SENDGRID_FROM_EMAIL` | From email address | `noreply@fenix.com` |

### Twilio (SMS)
| Variable | Description | Example |
|----------|-------------|---------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID | `AC...` |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `...` |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | `+1234567890` |

## 🚀 Quick Setup Commands

```bash
# Interactive setup
npm run setup-env

# Manual setup
cp env.example .env
# Edit .env file with your values

# Generate secure secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🔍 Validation Checklist

- [ ] `NODE_ENV` is set
- [ ] Database connection variables are configured
- [ ] `GOOGLE_MAPS_API_KEY` is set (if using maps)
- [ ] Security secrets are generated
- [ ] Optional services are configured (if needed)
- [ ] `.env` file is in `.gitignore`

## 🛡️ Security Notes

- ✅ Never commit `.env` files
- ✅ Use different keys for dev/prod
- ✅ Rotate secrets regularly
- ✅ Restrict API key permissions
- ❌ Don't share secrets publicly
- ❌ Don't use default/example values in production 