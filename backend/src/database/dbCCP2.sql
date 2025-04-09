CREATE TABLE `Giveaway` (
  `giveaway_id` INTEGER PRIMARY KEY,
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
  `giveaway_id` int,
  `registration_date` date DEFAULT (DATE('now')),
  PRIMARY KEY (`participant_id`, `giveaway_id`),
  FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`participant_id`),
  FOREIGN KEY (`giveaway_id`) REFERENCES `Giveaway` (`giveaway_id`)
);

CREATE TABLE `Winner` (
  `participant_id` int,
  `giveaway_id` int,
  `prize_won` varchar(255),
  PRIMARY KEY (`participant_id`, `giveaway_id`),
  FOREIGN KEY (`participant_id`) REFERENCES `Participant` (`participant_id`),
  FOREIGN KEY (`giveaway_id`) REFERENCES `Giveaway` (`giveaway_id`)
);
