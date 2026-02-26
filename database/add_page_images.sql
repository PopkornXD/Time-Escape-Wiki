-- Add images column to page table to store image paths
ALTER TABLE page ADD COLUMN images TEXT AFTER content;
