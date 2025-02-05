Quickli: Seat-Based Licensing & Account Security Strategy

Overview

This document outlines a scalable seat-based licensing model that ensures fair usage while allowing legitimate flexibility. It combines transparent seat management, real-time session tracking, and an escalating enforcement approach to reduce account sharing without negatively impacting customer experience.

The proposed solution addresses business objectives, technical enforcement strategies, and a gradual rollout plan that balances revenue opportunities with user trust.

1. Business Strategy & Pricing

1.1 Clear Usage & Pricing Tiers

To align with different business sizes and prevent account sharing, we propose introducing structured pricing tiers:

Single Broker – 1 seat (default for individual brokers).

Family Office / Mid-Sized – 2 to 10 seats.

Big Enterprise – Unlimited seats, with volume pricing.

1.2 Seat Management

Each business will have an admin user responsible for managing seats.

Admins can assign and revoke seats via an online portal.

Enforce two-factor authentication (2FA) for admins to secure access to seat management.

1.3 Seat Change Limits

Limit how often seat assignments (email reassignments) can occur per day or week.

If an admin repeatedly reassigns seats, log this behaviour and notify support to investigate potential account sharing.

2. Visibility & Transparency

2.1 Last Login & Session Info

To reinforce accountability, each user will see:

Their last login timestamp.

The IP address and device used.

A history of past logins for self-review.

2.2 Admin-Level Session Logs

Admins will have access to a summary of active users, their last login details, and which devices are in use.

If an account is flagged for suspicious activity, admins can forcibly log out users or block future access.

2.3 Usage Offender Tracking

If we detect two brokers actively using the same seat at the same time, we log this in a violations register.

Over time, we can present this data to admins or internal teams to take appropriate action.

3. Technical Approach

3.1 Session State & Redis

To track session activity efficiently, I propose storing session state in Redis:

When magic link is created generate a session ID and store:

User ID, device fingerprint, IP address, and login timestamp.

On magic link verification and each request:

Validate the session exists in Redis.

Update the session’s last active time.

3.2 Device Fingerprinting

Use FingerprintJS or a similar library to create a semi-unique device ID.

Associate each login session with a device fingerprint and IP address.

If the same seat is used across multiple devices concurrently, flag this as potential sharing.

3.3 Suspicion & Offence Tracking

If multiple concurrent logins with different device fingerprints occur, register an offence.

Escalating responses:

1st offence: Send a warning email to the user and admin.

2nd offence: Require the user to re-authenticate or kill the old session.

3rd offence: Block the account or require an upgrade.

4. Session Handling & Approval Flow

4.1 Email Approval Link

If we detect an active session on two devices, we prompt the user/admin to approve or deny the new login.

Example Flow:

User logs in from Device B, but Device A is still active.

The system sends an approval email:
"We detected a login from a new device. Approve or deny?"

Clicking Approve will:

Invalidate the old session (Device A).

Keep the new session (Device B) active.

Clicking Deny will:

Block the new login attempt or force a full logout.

4.2 Real-Time Session Killing (Optional)

If using WebSockets or Socket.io, we can immediately notify the first session when a conflicting login is detected.

The active session can be killed in real-time, forcing the user to log in again.

5. Onboarding & Rollout Plan

Phase 1: Data Collection (Instrument & Observe)

Start logging session concurrency, device fingerprints, and violations.

Do not enforce any restrictions yet—just observe how many users are sharing accounts.

Phase 2: Introduce Seat Management & Pricing

Segment existing customers into Single Broker, Family Office, and Enterprise tiers.

Provide an admin portal for seat assignment and tracking.

Send email communication informing customers of upcoming enforcement.

Phase 3: Soft Enforcement

Begin sending email warnings to users detected sharing accounts.

Show usage logs in the admin portal, allowing businesses to self-correct.

Encourage upgrades to appropriate seat-based plans.

Phase 4: Hard Enforcement

Force session re-authentication or log out duplicate users.

Implement account blocks for repeat violators.

Provide an upgrade path for teams needing more seats.

6. Expected Outcomes

By implementing seat-based licensing and smart session tracking, we achieve:

Improved revenue capture by reducing account sharing and encouraging paid upgrades.

Transparent usage tracking that reassures legitimate users while deterring bad actors.

Gradual enforcement that allows customers to self-correct before taking hard action.

Final Thoughts

This plan balances:

Business needs: Ensuring businesses pay for the right level of access.

Technical enforcement: Real-time session validation, concurrency tracking, and fingerprinting.

User experience: Allowing legitimate multi-device access while discouraging seat sharing.

By rolling out enforcement gradually, we avoid alienating customers, allowing them to adjust their usage before taking stronger action.

This approach preserves revenue, reduces abuse, and ensures fair pricing across customer segments.
