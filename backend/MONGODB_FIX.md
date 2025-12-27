# MongoDB Authentication Error - Solutions

## Current Error
```
bad auth : Authentication failed.
```

## Root Causes

The MongoDB connection is failing because:

1. **Missing database name** in the URI
2. **Possibly incorrect authentication database**
3. **Port not updated** (still showing 5000 instead of 5001)

## Solutions to Try

### Option 1: Standard Format (Try This First)
```env
PORT=5001
MONGO_URI=mongodb+srv://ahmadbilaldeveloper_db_user:hAHz0V88QWbfnCN3@cluster009.c3rnedq.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Option 2: With Explicit Auth Database
```env
PORT=5001
MONGO_URI=mongodb+srv://ahmadbilaldeveloper_db_user:hAHz0V88QWbfnCN3@cluster009.c3rnedq.mongodb.net/taskmanagement?authSource=admin&retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Option 3: Minimal Format
```env
PORT=5001
MONGO_URI=mongodb+srv://ahmadbilaldeveloper_db_user:hAHz0V88QWbfnCN3@cluster009.c3rnedq.mongodb.net/taskmanagement
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

## Key Changes from Your Current .env

1. **Added `PORT=5001`** - Changed from 5000 to avoid macOS AirPlay conflict
2. **Added `/taskmanagement`** - Database name after cluster URL
3. **Removed `?appName=Cluster009`** - This is optional metadata
4. **Added standard MongoDB Atlas parameters** - `retryWrites=true&w=majority`

## Steps to Fix

1. **Copy one of the options above** (start with Option 1)
2. **Replace your entire `.env` file content** with the chosen option
3. **Save the file**
4. The backend should auto-restart with nodemon
5. Check the terminal for "MongoDB Connected" message

## If Still Failing

If authentication still fails, you may need to:

1. **Verify MongoDB Atlas credentials**:
   - Go to MongoDB Atlas dashboard
   - Check Database Access → Database Users
   - Verify username is `ahmadbilaldeveloper_db_user`
   - Reset password if needed

2. **Check IP Whitelist**:
   - Go to Network Access
   - Ensure `0.0.0.0/0` is allowed (or your current IP)

3. **Verify cluster name**:
   - Ensure cluster is `cluster009.c3rnedq.mongodb.net`
