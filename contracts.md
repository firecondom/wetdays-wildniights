# Fire Condom Landing Page - API Contracts

## Current Mock Data (to be replaced)

### Frontend Mock Data (`/frontend/src/data/mockData.js`)
- `nigerianStates` - Array of 37 Nigerian states
- `mockFormSubmissions` - Empty array (currently unused)
- `storeLocations` - Object mapping states to store arrays
- `fireProducts` - Array of 3 product objects (Xtra, Xtacy, Xotica)

### Frontend Mock Functionality
- Form submission shows success toast
- Form reset after submission
- No actual data persistence
- Instagram links work directly
- Static store location display

## Backend API Contracts

### 1. Email Signup Endpoint
```
POST /api/signup
Request Body: {
  nickname: string (required),
  email: string (required, valid email),
  state: string (required, must be valid Nigerian state)
}
Response: {
  success: boolean,
  message: string,
  data: { id, nickname, email, state, createdAt }
}
```

### 2. Get Signups Endpoint (Admin)
```
GET /api/signups
Response: {
  success: boolean,
  data: [{ id, nickname, email, state, createdAt }]
}
```

### 3. Store Locations Endpoint
```
GET /api/stores
Response: {
  success: boolean,
  data: { [stateName]: [storeArray] }
}

GET /api/stores/:state
Response: {
  success: boolean,
  data: [storeArray] or null if not found
}
```

### 4. Products Endpoint
```
GET /api/products
Response: {
  success: boolean,
  data: [{ id, name, variant, color, features, description }]
}
```

## MongoDB Models

### 1. EmailSignup Model
```javascript
{
  _id: ObjectId,
  nickname: String (required),
  email: String (required, unique, validated),
  state: String (required),
  createdAt: Date (default: now),
  utm_source: String (optional - for tracking Boomplay vs SportyBet),
  utm_campaign: String (optional)
}
```

### 2. StoreLocation Model
```javascript
{
  _id: ObjectId,
  state: String (required),
  stores: [String] (array of store names),
  updatedAt: Date
}
```

### 3. Product Model (Optional - can be static)
```javascript
{
  _id: ObjectId,
  productId: String (xtra, xtacy, xotica),
  name: String,
  variant: String,
  color: String,
  features: [String],
  description: String,
  active: Boolean (default: true)
}
```

## Frontend Integration Changes

### 1. Replace Mock Form Submission
**File:** `/frontend/src/components/LandingPage.jsx`
**Function:** `handleSubmit`
- Remove mock toast success
- Add API call to POST /api/signup
- Handle loading state
- Handle error responses
- Keep success toast and form reset

### 2. Add API Service
**New File:** `/frontend/src/services/api.js`
- Create axios instance with base URL
- Export signup function
- Export getStores function  
- Export getProducts function
- Handle error responses consistently

### 3. Environment Variables
- Backend: EMAIL_NOTIFICATION_ADDRESS (for signup notifications)
- Frontend: REACT_APP_BACKEND_URL (already exists)

## Implementation Priority

### Phase 1: Core Signup Functionality
1. Create EmailSignup MongoDB model
2. Implement POST /api/signup endpoint
3. Add email validation and state validation
4. Update frontend to use real API
5. Add loading states and error handling

### Phase 2: Data Management
1. Implement GET /api/signups (admin endpoint)
2. Seed store locations data in MongoDB
3. Implement store locations endpoints
4. Optional: Add products endpoints

### Phase 3: Enhancements
1. Add UTM tracking for ad source (Boomplay vs SportyBet)
2. Email notifications for new signups
3. Export functionality for email list
4. Analytics integration placeholders

## Integration Steps

1. **Backend Development**
   - Add new models to server.py
   - Create API endpoints
   - Add validation and error handling
   - Test endpoints

2. **Frontend Integration**  
   - Create API service file
   - Update LandingPage component
   - Add loading and error states
   - Test form submission flow

3. **Data Seeding**
   - Seed Nigerian states validation
   - Seed store locations
   - Optional: Seed products data

## Success Criteria

- Form submission saves to MongoDB
- Email validation works
- State validation against Nigerian states
- Success/error feedback to users
- Admin can view signups
- Store locator shows real data
- No breaking changes to UI/UX