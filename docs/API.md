# InclusiveGO API Documentation

This document describes the current and planned API endpoints for InclusiveGO.

## Table of Contents

- [Overview](#overview)
- [Current API (MVP)](#current-api-mvp)
- [Future API Endpoints](#future-api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Overview

### Base URL

**Development:** `http://localhost:3000/api`
**Production:** `https://inclusivego.com/api` (future)

### Response Format

All API responses follow this structure:

```typescript
{
  data: T | null;           // Response data or null on error
  success: boolean;         // true if successful, false on error
  error?: string;           // Error message (only present on failure)
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Current API (MVP)

### Routes

#### GET /api/routes

Fetch all available routes.

**Request:**
```http
GET /api/routes
```

**Response:**
```typescript
{
  data: {
    routes: Route[];
    count: number;
  };
  success: true;
}
```

**Example:**
```json
{
  "data": {
    "routes": [
      {
        "id": 1,
        "origin": "Central Station",
        "destination": "Modern Art Museum",
        "duration": "18 mins",
        "distance": "1.2 km",
        "type": "Public Transit",
        "score": 98,
        "features": ["Step-free access", "Braille signage", "Hearing loops"],
        "tags": ["Wheelchair", "Visual", "Auditory"],
        "status": "Clear",
        "description": "A fully level route utilizing the new metro line and low-floor buses."
      }
    ],
    "count": 3
  },
  "success": true
}
```

**Current Implementation:**
- Returns mock data from `mockRoutes.ts`
- No filtering or pagination
- No authentication required

---

#### POST /api/search

Search for routes based on query and requirements.

**Request:**
```http
POST /api/search
Content-Type: application/json

{
  "query": "museum",
  "activeRequirements": ["wheelchair", "visual"]
}
```

**Request Body:**
```typescript
{
  query: string;
  activeRequirements: string[];
}
```

**Response:**
```typescript
{
  data: {
    routes: Route[];
    count: number;
  };
  success: true;
}
```

**Example:**
```json
{
  "data": {
    "routes": [
      {
        "id": 1,
        "origin": "Central Station",
        "destination": "Modern Art Museum",
        // ... full route object
      }
    ],
    "count": 1
  },
  "success": true
}
```

**Current Implementation:**
- Basic search by origin/destination
- Requirements filter not yet implemented
- Returns mock data

---

#### GET /api/requirements

Fetch all accessibility requirements.

**Request:**
```http
GET /api/requirements
```

**Response:**
```typescript
{
  data: Requirement[];
  success: true;
}
```

**Example:**
```json
{
  "data": [
    {
      "id": "wheelchair",
      "label": "Wheelchair Access",
      "color": "text-blue-600"
    },
    {
      "id": "visual",
      "label": "Visual Aid",
      "color": "text-purple-600"
    }
  ],
  "success": true
}
```

**Current Implementation:**
- Returns mock data from `mockRequirements.ts`
- No database integration

---

## Future API Endpoints

### Authentication

#### POST /api/auth/register

Register a new user account.

**Request:**
```typescript
{
  email: string;
  password: string;
  name: string;
}
```

**Response:**
```typescript
{
  data: {
    user: User;
    token: string;
  };
  success: true;
}
```

---

#### POST /api/auth/login

Login with email and password.

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  data: {
    user: User;
    token: string;
  };
  success: true;
}
```

---

#### POST /api/auth/logout

Logout current user.

**Request:**
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: null;
  success: true;
}
```

---

#### POST /api/auth/reset-password

Request password reset email.

**Request:**
```typescript
{
  email: string;
}
```

**Response:**
```typescript
{
  data: {
    message: "Password reset email sent";
  };
  success: true;
}
```

---

### Users

#### GET /api/users/:id

Get user profile by ID.

**Request:**
```http
GET /api/users/123
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    accessibilityProfile: {
      requirements: string[];
      preferences: Record<string, any>;
    };
    createdAt: string;
  };
  success: true;
}
```

---

#### PATCH /api/users/:id

Update user profile.

**Request:**
```http
PATCH /api/users/123
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Name",
  "accessibilityProfile": {
    "requirements": ["wheelchair", "visual"]
  }
}
```

**Response:**
```typescript
{
  data: User;
  success: true;
}
```

---

### Routes (Enhanced)

#### GET /api/routes

Fetch routes with filters and pagination.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20, max: 100)
- `origin` (string) - Filter by origin
- `destination` (string) - Filter by destination
- `requirements` (string[]) - Accessibility requirements
- `minScore` (number) - Minimum accessibility score
- `type` (string) - Route type (Public Transit, Walking, etc.)
- `sort` (string) - Sort field (score, duration, distance)
- `order` (string) - Sort order (asc, desc)

**Request:**
```http
GET /api/routes?page=1&limit=10&requirements=wheelchair&minScore=90&sort=score&order=desc
```

**Response:**
```typescript
{
  data: {
    routes: Route[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  success: true;
}
```

---

#### GET /api/routes/:id

Get detailed information for a specific route.

**Request:**
```http
GET /api/routes/123
```

**Response:**
```typescript
{
  data: {
    id: number;
    origin: string;
    destination: string;
    // ... all route fields
    verifications: Verification[];
    reviews: Review[];
    avgRating: number;
    reviewCount: number;
  };
  success: true;
}
```

---

#### POST /api/routes

Submit a new route (authenticated users).

**Request:**
```http
POST /api/routes
Authorization: Bearer {token}
Content-Type: application/json

{
  "origin": "Downtown Plaza",
  "destination": "City Park",
  "type": "Walking/Rolling",
  "features": ["Smooth pavement", "Tactile paving"],
  "description": "Well-maintained pedestrian route with accessibility features"
}
```

**Response:**
```typescript
{
  data: Route;
  success: true;
}
```

**Status:** `201 Created`

---

#### PATCH /api/routes/:id

Update route information (authenticated users, route owner or admin).

**Request:**
```http
PATCH /api/routes/123
Authorization: Bearer {token}
Content-Type: application/json

{
  "features": ["Smooth pavement", "Tactile paving", "Rest benches"],
  "status": "Clear"
}
```

**Response:**
```typescript
{
  data: Route;
  success: true;
}
```

---

#### DELETE /api/routes/:id

Delete a route (admin only).

**Request:**
```http
DELETE /api/routes/123
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: null;
  success: true;
}
```

**Status:** `200 OK`

---

### Reviews

#### GET /api/routes/:id/reviews

Get reviews for a specific route.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)

**Request:**
```http
GET /api/routes/123/reviews?page=1&limit=10
```

**Response:**
```typescript
{
  data: {
    reviews: Review[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  success: true;
}
```

---

#### POST /api/routes/:id/reviews

Submit a review for a route (authenticated users).

**Request:**
```http
POST /api/routes/123/reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent accessibility features, very smooth route!",
  "photos": ["photo1.jpg", "photo2.jpg"]
}
```

**Response:**
```typescript
{
  data: Review;
  success: true;
}
```

**Status:** `201 Created`

---

#### PATCH /api/reviews/:id

Update a review (authenticated user, review owner).

**Request:**
```http
PATCH /api/reviews/456
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated review text"
}
```

**Response:**
```typescript
{
  data: Review;
  success: true;
}
```

---

#### DELETE /api/reviews/:id

Delete a review (authenticated user, review owner or admin).

**Request:**
```http
DELETE /api/reviews/456
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: null;
  success: true;
}
```

---

### Favorites

#### GET /api/users/:id/favorites

Get user's saved/favorited routes.

**Request:**
```http
GET /api/users/123/favorites
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: {
    favorites: Route[];
    count: number;
  };
  success: true;
}
```

---

#### POST /api/users/:id/favorites

Add a route to favorites.

**Request:**
```http
POST /api/users/123/favorites
Authorization: Bearer {token}
Content-Type: application/json

{
  "routeId": 456
}
```

**Response:**
```typescript
{
  data: {
    routeId: number;
    userId: number;
    createdAt: string;
  };
  success: true;
}
```

**Status:** `201 Created`

---

#### DELETE /api/users/:id/favorites/:routeId

Remove a route from favorites.

**Request:**
```http
DELETE /api/users/123/favorites/456
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  data: null;
  success: true;
}
```

---

### Verifications

#### POST /api/routes/:id/verify

Verify route accessibility (authenticated users).

**Request:**
```http
POST /api/routes/123/verify
Authorization: Bearer {token}
Content-Type: application/json

{
  "verified": true,
  "date": "2026-01-15",
  "notes": "Confirmed step-free access, all features working"
}
```

**Response:**
```typescript
{
  data: Verification;
  success: true;
}
```

**Status:** `201 Created`

---

### Real-Time Status

#### POST /api/routes/:id/status

Report current route status (authenticated users).

**Request:**
```http
POST /api/routes/123/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Temporarily blocked",
  "issue": "Construction work on sidewalk",
  "expiresAt": "2026-01-20"
}
```

**Response:**
```typescript
{
  data: StatusReport;
  success: true;
}
```

**Status:** `201 Created`

---

#### GET /api/routes/:id/status

Get current status reports for a route.

**Request:**
```http
GET /api/routes/123/status
```

**Response:**
```typescript
{
  data: {
    current: StatusReport | null;
    recent: StatusReport[];
  };
  success: true;
}
```

---

## Authentication

### Bearer Token

Most endpoints require authentication using a Bearer token:

```http
Authorization: Bearer {your-access-token}
```

### Token Lifecycle

1. **Login/Register** - Receive access token
2. **Include in requests** - Add to Authorization header
3. **Refresh** - Tokens expire after 24 hours (future: refresh tokens)
4. **Logout** - Invalidate token

### Permissions

- **Public** - No authentication required
- **Authenticated** - Valid token required
- **Owner** - User owns the resource
- **Admin** - Admin role required

---

## Error Handling

### Error Response Format

```typescript
{
  data: null;
  success: false;
  error: string;
}
```

### Common Errors

#### 400 Bad Request
```json
{
  "data": null,
  "success": false,
  "error": "Invalid request: missing required field 'email'"
}
```

#### 401 Unauthorized
```json
{
  "data": null,
  "success": false,
  "error": "Authentication required"
}
```

#### 403 Forbidden
```json
{
  "data": null,
  "success": false,
  "error": "Insufficient permissions"
}
```

#### 404 Not Found
```json
{
  "data": null,
  "success": false,
  "error": "Route not found"
}
```

#### 500 Internal Server Error
```json
{
  "data": null,
  "success": false,
  "error": "An unexpected error occurred"
}
```

---

## Rate Limiting

### Future Implementation

Rate limits will be applied per IP address and per user:

**Unauthenticated:**
- 100 requests per 15 minutes

**Authenticated:**
- 1000 requests per 15 minutes

**Response Headers:**
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642521600
```

**Rate Limit Exceeded:**
```json
{
  "data": null,
  "success": false,
  "error": "Rate limit exceeded. Try again in 5 minutes."
}
```

**Status:** `429 Too Many Requests`

---

## Webhooks (Future)

### Route Status Updates

Subscribe to route status changes:

```http
POST /api/webhooks/subscribe
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "events": ["route.status.updated", "route.verified"],
  "routeIds": [123, 456]
}
```

**Webhook Payload:**
```json
{
  "event": "route.status.updated",
  "timestamp": "2026-01-15T10:30:00Z",
  "data": {
    "routeId": 123,
    "status": "Temporarily blocked",
    "issue": "Construction work"
  }
}
```

---

## Versioning (Future)

API versions will be indicated in the URL:

```http
GET /api/v1/routes
GET /api/v2/routes
```

**Current:** All endpoints are v1 (implicit)

---

## Data Types Reference

### Route

```typescript
interface Route {
  id: number;
  origin: string;
  destination: string;
  duration: string;
  distance: string;
  type: 'Public Transit' | 'Walking/Rolling' | 'Shuttle' | string;
  icons: string[];  // Icon names
  score: number;    // 0-100 accessibility score
  features: string[];
  tags: string[];   // Accessibility tags
  status: string;
  description: string;
  createdBy?: number;  // User ID
  createdAt?: string;
  updatedAt?: string;
}
```

### User

```typescript
interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  accessibilityProfile: {
    requirements: string[];
    fontSize: string;
    contrastMode: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Review

```typescript
interface Review {
  id: number;
  routeId: number;
  userId: number;
  rating: number;  // 1-5
  comment: string;
  photos?: string[];
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
}
```

### Verification

```typescript
interface Verification {
  id: number;
  routeId: number;
  userId: number;
  verified: boolean;
  date: string;
  notes?: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}
```

### StatusReport

```typescript
interface StatusReport {
  id: number;
  routeId: number;
  userId: number;
  status: string;
  issue?: string;
  expiresAt?: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}
```

---

## Testing the API

### Development

Use tools like:
- **cURL** - Command line
- **Postman** - GUI client
- **Insomnia** - REST client
- **Thunder Client** - VS Code extension

### Example cURL Requests

**Get all routes:**
```bash
curl http://localhost:3000/api/routes
```

**Search routes:**
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"museum","activeRequirements":["wheelchair"]}'
```

**Get requirements:**
```bash
curl http://localhost:3000/api/requirements
```

---

## Migration Path

### Phase 1 (Current)
- ✅ Mock data endpoints
- ✅ Basic structure

### Phase 2 (Next)
- [ ] Database integration
- [ ] Real data queries
- [ ] Pagination support

### Phase 3
- [ ] Authentication
- [ ] User endpoints
- [ ] Protected routes

### Phase 4
- [ ] Reviews and ratings
- [ ] Verifications
- [ ] Real-time status

### Phase 5
- [ ] Webhooks
- [ ] Rate limiting
- [ ] API versioning

---

**Last Updated:** January 2026
**Version:** 1.0
