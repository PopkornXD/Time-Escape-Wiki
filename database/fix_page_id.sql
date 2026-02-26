-- Fix page table ID to auto-increment
ALTER TABLE page MODIFY COLUMN id INT AUTO_INCREMENT;

-- Verify the change
DESCRIBE page;
