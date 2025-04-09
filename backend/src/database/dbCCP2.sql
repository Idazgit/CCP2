CREATE TABLE `Contest` (
  `contest_id` INTEGER PRIMARY KEY,
  `name` varchar(255),
  `prize` varchar(255),
  `draw_date` date
);

CREATE TABLE `Participant` (
  `participant_id` INTEGER PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255)
);

CREATE TABLE `Registration` (
  `participant_id` int,
  `contest_id` int,
  `registration_date` date,
  PRIMARY KEY (`participant_id`, `contest_id`),
  FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`participant_id`),
  FOREIGN KEY (`contest_id`) REFERENCES `Contest` (`contest_id`)
);

CREATE TABLE `Winner` (
  `participant_id` int,
  `contest_id` int,
  `prize_won` varchar(255),
  PRIMARY KEY (`participant_id`, `contest_id`),
  FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`participant_id`),
  FOREIGN KEY (`contest_id`) REFERENCES `Contest` (`contest_id`)
);
