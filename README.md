# BloomPro Certs

Orchid Grower Certification & Training Management System built with Angular + Firebase.

## Live Demo

https://bloompro-certs.web.app

## Login Credentials

### Admin
- Email: `admin@bloompro.com`
- Password: `Admin@123`

### Member
- Email: `member@bloompro.com`
- Password: `Member@123`

## How to Use

### As Admin
1. Log in with the admin credentials above
2. You land on the **Admin Dashboard** with quick-access cards
3. **Create Certificate** — fill in member ID, name, certification name, issuer, dates, and an optional document URL (paste a Google Drive or Dropbox PDF link)
4. **View Certificates** — see all certifications in a searchable table; use the search box to filter by member, certification type, issuer, or status; click Edit or Delete on any row
5. **Members** — add, edit, or delete member records (memberId, name, email, role, societyId)
6. **Statistics** — view summary cards (total members, certified members, active/expired counts) and charts broken down by certification status and type
7. **Profile** — view and edit your own profile details
8. **Logout** — click the Logout link in the sidebar

### As Member
1. Log in with the member credentials above
2. You land on the **Member Dashboard** showing only your own certifications
3. View certification name, issue date, expiry date, status, and issuer
4. Click **Logout** to sign out

## Tech Stack

- Angular 17 (standalone components, strict mode)
- Firebase Authentication
- Cloud Firestore
- TypeScript
- Chart.js

## Firestore Collections

- `members` — memberId, email, name, role, societyId
- `certifications` — memberId, memberName, certificationName, issueDate, expiryDate, issuer, status, documentUrl

## Run Locally

```bash
npm install
ng serve
```

Open http://localhost:4200
