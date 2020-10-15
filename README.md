# Imgs
<img src="https://i.imgur.com/hM4FDij.png" width="1000rem" />

# Database
```sql
CREATE DATABASE IF NOT EXISTS `csgostore` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `csgostore`;

-- Copiando estrutura para tabela csgostore.admin_accounts
DROP TABLE IF EXISTS `admin_accounts`;
CREATE TABLE IF NOT EXISTS `admin_accounts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela csgostore.admin_accounts: ~0 rows (aproximadamente)
DELETE FROM `admin_accounts`;
/*!40000 ALTER TABLE `admin_accounts` DISABLE KEYS */;
INSERT INTO `admin_accounts` (`ID`, `username`, `password`) VALUES
	(1, 'gabrielh2c', '123');
/*!40000 ALTER TABLE `admin_accounts` ENABLE KEYS */;

-- Copiando estrutura para tabela csgostore.items
DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `item_hash` varchar(5000) DEFAULT NULL,
  `item_name` varchar(3000) DEFAULT NULL,
  `image_url` varchar(3000) DEFAULT NULL,
  `preview` varchar(3000) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `view_counter` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela csgostore.items: ~7 rows (aproximadamente)
DELETE FROM `items`;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`ID`, `item_hash`, `item_name`, `image_url`, `preview`, `price`, `view_counter`) VALUES
	(5, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09G3h5SOhe7LO77QgHIf7pJ0iLGS94_2jAOx_BdvZGr2I9eVegVvNV3Q_gW8lbrsgZC875TPnWwj5HcWwWbOUQ', 'AK-47 | Porte de Elite (Veterana de Guerra)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09G3h5SOhe7LO77QgHJu5MRjjeyP89vwigznqRA_N26mI9KWdQU7ZgnQ8lLvlevvgcK-6MnKzXRj6SkksWGdwULURAAVxw', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561199003816734A19662254631D3237534314405751065', 5, 1),
	(6, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwPz3YzhG09GzkImemrnwMOLTwG8D7sB137qZrIisjlGyrRdtYWmiI9XBdg4_ZA3Tq1jvwru7m9bi67rBvkPM', 'MAC-10 | Maçã do Amor (Testada em Campo)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwPz3YzhG09GzkImemsj4MqnWkyVV65xz3O2T84nx3Qfs8hdlNTylctKUcAZvZguE_lm_xLvs1J_tv8id1zI97R8uUQm1', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561199003816734A19662266664D2756781496645289065', 2, 3),
	(7, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-5mpSEguXLPr7Vn35cpp10j-uZrYqj3QLg-EE_YDr6JY7BcFA5YVyDq1LqwebthsC8uZybznp9-n51WXfLk64', 'P250 | Valência (Testada em Campo)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-5mpSEguXLPr7Vn35c18lwmO7Eu9TwjVbs8xVqZm_3J4TGcVU3YFCE-Ae5weq81JXovJXLyiRjvyFw4nfD30vgN-NX6nY', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561199003816734A19593156388D10010481814608316682', 1, 1),
	(9, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibK8LxVh7PTEfitH_-O0mI-Ek__7JrXVqWNI7NdwterA5onKgFWmrxYyNj2cedPBK0Njf1_RqwDvkOq715e0v5TAwHVquHEr4irblxKygBpKPeBmjfKfHw6bD_ZXXP7V4UFCH_A', 'Luvas da Hidra (★) | Aquecimento de Aço (Bem Desgastada)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibK8LxVh7PTEfitH_-O0mI-Ek__7JrXVqWNI7NdwterA5onKgFWmrxYyNj2cedPBK0NjDgSBuAbr3-nu1Mft7Zmdm3NruSkr7HjUnUS-hk1KZuJqhPeYGlmXD6JISvKHDiDO8MckGEyxk8s', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198354798459A19613641276D14465955847631862009', 650, 5),
	(10, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPv9NLPF2G1UsZFw373Cp96kigbgrUBuY22nLIWUcgRvN17Y8lnrlbrm157quJ3XiSw0p7BLliM', 'AK-47 (StatTrak™) | Linhas Vermelhas (Pouco Usada)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPv9NLPFqWdQ-sJ0xL6VrNj3jlCy_0tpZj-nINOTIwRqMwzZ8lLrle6-h5K_75XJnCRruSA8pSGKEtwySt8', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198354798459A19671974533D4767874560069094897', 5632.99, 2),
	(11, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09--m5CbkuXLNLPehX9u4MBwnPCPo9ql3ATi8xc4MT2hJoXHdwJqZFzR8gDtlLrph8DvuprKziRluHEltGGdwULXZJEaNA', 'M4A4 (StatTrak™) | Magnésio (Veterana de Guerra)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09--m5CbkuXLNLPehX9u4MBwnPD--Y3nj1H6_UVsZ2n1LNLBIFJsY1uC_1XqxOrujcfv6cnPyyQwvCch4inbnUSw0AYMMLJe5TYC6w', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561199003816734A19593143253D9972208502989229568', 5.55, 1),
	(12, '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLDYm2Rf5_p1g-jM-oLxm2umrhcDPzCkfMKLewY8NVDZ_le8x7ztjJbqusvJmCdgsiYlsH3cmR2zhB1NZ-JogvGXQULeWfLIJRig1Q', 'Luvas de Especialista (★) | Quimono Carmesim (Pouco Usada)', '-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLDYm2Rf5_p1g-jM-oLxm2umrhcDPzCkfML6Lld8Ng3O81G8lebmgZC-us_LwHI1vHYitCrelxOw1BpNaO1rgPCfQFuZAKFAFL7CWCTh-JuFUg', 'steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198354798459A19582712711D16629309015997075670', 6456.99, 1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
```
