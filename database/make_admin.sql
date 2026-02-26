-- Make a user an admin
-- Replace 'username' with the actual username
UPDATE users SET is_admin = TRUE WHERE username = 'your_username_here';

-- Check admin users
SELECT id, username, email, is_admin FROM users WHERE is_admin = TRUE;
