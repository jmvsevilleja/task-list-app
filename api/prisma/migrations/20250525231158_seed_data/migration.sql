-- This is an empty migration.-- Add sample users
INSERT INTO "User" ("email", "password", "name", "createdAt", "updatedAt")
VALUES 
  ('john@example.com', '$2b$12$PCHY3zpfhhm4Snpw8YwKDOy5RtcwrF/Fnqgj3VXya1Ic5/ZK0kD0a', 'John Doe', NOW(), NOW()),
  ('jane@example.com', '$2b$12$PCHY3zpfhhm4Snpw8YwKDOy5RtcwrF/Fnqgj3VXya1Ic5/ZK0kD0a', 'Jane Smith', NOW(), NOW());

-- Add sample tasks (password for both users is "password123")
INSERT INTO `Task` (`title`, `content`, `completed`, `dueDate`, `userId`, `createdAt`, `updatedAt`)
VALUES
  ('Complete project', 'Finish the task management app', false, DATE_ADD(NOW(), INTERVAL 5 DAY), 1, NOW(), NOW()),
  ('Buy groceries', 'Milk, eggs, bread', false, DATE_ADD(NOW(), INTERVAL 1 DAY), 1, NOW(), NOW()),
  ('Schedule meeting', 'With the development team', true, DATE_SUB(NOW(), INTERVAL 1 DAY), 1, NOW(), NOW()),
  ('Review PRs', 'Code review for new features', false, DATE_ADD(NOW(), INTERVAL 3 DAY), 2, NOW(), NOW());