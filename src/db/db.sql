CREATE DATABASE IF NOT EXISTS `tb-valhalla-crypting` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tb-valhalla-crypting`;
-- Valhhalla
CREATE TABLE `valhalla` (
  `increment` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `user` varchar(100) NOT NULL,
  `PLAYER` varchar(255) DEFAULT NULL,
  `Might` int(11) DEFAULT NULL,
  `AncientPoints` int(11) DEFAULT NULL,
  `TLevel` int(11) DEFAULT NULL,
  `Volume` int(11) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL,
  `co5` int(11) DEFAULT NULL,
  `co10` int(11) DEFAULT NULL,
  `co15` int(11) DEFAULT NULL,
  `co20` int(11) DEFAULT NULL,
  `co25` int(11) DEFAULT NULL,
  `ra10` int(11) DEFAULT NULL,
  `ra15` int(11) DEFAULT NULL,
  `ra20` int(11) DEFAULT NULL,
  `ra25` int(11) DEFAULT NULL,
  `ra30` int(11) DEFAULT NULL,
  `ep15` int(11) DEFAULT NULL,
  `ep20` int(11) DEFAULT NULL,
  `ep25` int(11) DEFAULT NULL,
  `ep30` int(11) DEFAULT NULL,
  `ep35` int(11) DEFAULT NULL,
  `st10` int(11) DEFAULT NULL,
  `st15` int(11) DEFAULT NULL,
  `st20` int(11) DEFAULT NULL,
  `st25` int(11) DEFAULT NULL,
  `st30` int(11) DEFAULT NULL,
  `Bank` int(11) DEFAULT NULL,
  `Arena` int(11) DEFAULT NULL,
  `Heroic` int(11) DEFAULT NULL,
  `Special` int(11) DEFAULT NULL,
  `AncientChests` int(11) DEFAULT NULL,
  `QuickMarch` int(11) DEFAULT NULL,
  `Fenrir` int(11) DEFAULT NULL,
  `Jormungandr` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
ALTER TABLE `valhalla`
ADD PRIMARY KEY (`increment`, `report_date`);
ALTER TABLE `valhalla`
MODIFY `increment` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 100;
-- Legacy
CREATE TABLE `legacy` (
  `increment` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `user` varchar(100) NOT NULL,
  `PLAYER` varchar(255) DEFAULT NULL,
  `Might` int(11) DEFAULT NULL,
  `AncientPoints` int(11) DEFAULT NULL,
  `TLevel` int(11) DEFAULT NULL,
  `Volume` int(11) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL,
  `co5` int(11) DEFAULT NULL,
  `co10` int(11) DEFAULT NULL,
  `co15` int(11) DEFAULT NULL,
  `co20` int(11) DEFAULT NULL,
  `co25` int(11) DEFAULT NULL,
  `ra10` int(11) DEFAULT NULL,
  `ra15` int(11) DEFAULT NULL,
  `ra20` int(11) DEFAULT NULL,
  `ra25` int(11) DEFAULT NULL,
  `ra30` int(11) DEFAULT NULL,
  `ep15` int(11) DEFAULT NULL,
  `ep20` int(11) DEFAULT NULL,
  `ep25` int(11) DEFAULT NULL,
  `ep30` int(11) DEFAULT NULL,
  `ep35` int(11) DEFAULT NULL,
  `st10` int(11) DEFAULT NULL,
  `st15` int(11) DEFAULT NULL,
  `st20` int(11) DEFAULT NULL,
  `st25` int(11) DEFAULT NULL,
  `st30` int(11) DEFAULT NULL,
  `Bank` int(11) DEFAULT NULL,
  `Arena` int(11) DEFAULT NULL,
  `Heroic` int(11) DEFAULT NULL,
  `Special` int(11) DEFAULT NULL,
  `AncientChests` int(11) DEFAULT NULL,
  `QuickMarch` int(11) DEFAULT NULL,
  `Fenrir` int(11) DEFAULT NULL,
  `Jormungandr` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
ALTER TABLE `legacy`
ADD PRIMARY KEY (`increment`, `report_date`);
ALTER TABLE `legacy`
MODIFY `increment` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 100;
-- TPA
CREATE TABLE `tpa` (
  `increment` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `user` varchar(100) NOT NULL,
  `PLAYER` varchar(255) DEFAULT NULL,
  `Might` int(11) DEFAULT NULL,
  `AncientPoints` int(11) DEFAULT NULL,
  `TLevel` int(11) DEFAULT NULL,
  `Volume` int(11) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL,
  `co5` int(11) DEFAULT NULL,
  `co10` int(11) DEFAULT NULL,
  `co15` int(11) DEFAULT NULL,
  `co20` int(11) DEFAULT NULL,
  `co25` int(11) DEFAULT NULL,
  `ra10` int(11) DEFAULT NULL,
  `ra15` int(11) DEFAULT NULL,
  `ra20` int(11) DEFAULT NULL,
  `ra25` int(11) DEFAULT NULL,
  `ra30` int(11) DEFAULT NULL,
  `ep15` int(11) DEFAULT NULL,
  `ep20` int(11) DEFAULT NULL,
  `ep25` int(11) DEFAULT NULL,
  `ep30` int(11) DEFAULT NULL,
  `ep35` int(11) DEFAULT NULL,
  `st10` int(11) DEFAULT NULL,
  `st15` int(11) DEFAULT NULL,
  `st20` int(11) DEFAULT NULL,
  `st25` int(11) DEFAULT NULL,
  `st30` int(11) DEFAULT NULL,
  `Bank` int(11) DEFAULT NULL,
  `Arena` int(11) DEFAULT NULL,
  `Heroic` int(11) DEFAULT NULL,
  `Special` int(11) DEFAULT NULL,
  `AncientChests` int(11) DEFAULT NULL,
  `QuickMarch` int(11) DEFAULT NULL,
  `Fenrir` int(11) DEFAULT NULL,
  `Jormungandr` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
ALTER TABLE `tpa`
ADD PRIMARY KEY (`increment`, `report_date`);
ALTER TABLE `tpa`
MODIFY `increment` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 100;
-- Vinland
CREATE TABLE `vinland` (
  `increment` int(11) NOT NULL,
  `report_date` datetime NOT NULL,
  `user` varchar(100) NOT NULL,
  `PLAYER` varchar(255) DEFAULT NULL,
  `Might` int(11) DEFAULT NULL,
  `AncientPoints` int(11) DEFAULT NULL,
  `TLevel` int(11) DEFAULT NULL,
  `Volume` int(11) DEFAULT NULL,
  `Points` int(11) DEFAULT NULL,
  `co5` int(11) DEFAULT NULL,
  `co10` int(11) DEFAULT NULL,
  `co15` int(11) DEFAULT NULL,
  `co20` int(11) DEFAULT NULL,
  `co25` int(11) DEFAULT NULL,
  `ra10` int(11) DEFAULT NULL,
  `ra15` int(11) DEFAULT NULL,
  `ra20` int(11) DEFAULT NULL,
  `ra25` int(11) DEFAULT NULL,
  `ra30` int(11) DEFAULT NULL,
  `ep15` int(11) DEFAULT NULL,
  `ep20` int(11) DEFAULT NULL,
  `ep25` int(11) DEFAULT NULL,
  `ep30` int(11) DEFAULT NULL,
  `ep35` int(11) DEFAULT NULL,
  `st10` int(11) DEFAULT NULL,
  `st15` int(11) DEFAULT NULL,
  `st20` int(11) DEFAULT NULL,
  `st25` int(11) DEFAULT NULL,
  `st30` int(11) DEFAULT NULL,
  `Bank` int(11) DEFAULT NULL,
  `Arena` int(11) DEFAULT NULL,
  `Heroic` int(11) DEFAULT NULL,
  `Special` int(11) DEFAULT NULL,
  `AncientChests` int(11) DEFAULT NULL,
  `QuickMarch` int(11) DEFAULT NULL,
  `Fenrir` int(11) DEFAULT NULL,
  `Jormungandr` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
ALTER TABLE `vinland`
ADD PRIMARY KEY (`increment`, `report_date`);
ALTER TABLE `vinland`
MODIFY `increment` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 100;
-- Users
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin', 'user', 'valhalla', 'asgard') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
INSERT INTO `users` (
    `id`,
    `username`,
    `email`,
    `password`,
    `role`,
    `created_at`
  )
VALUES (
    2,
    'Admin',
    'crypting@vkg-tb.eu',
    '$2y$10$7RbMUnGCmNoapFOUH7G1O.OUA38kv4SP5qGpzsuEmhROMtMMjYZkm',
    'admin',
    '2024-12-04 16:03:53'
  ),
  (
    3,
    'Poppy',
    'poppy@vkg-tb.eu',
    '$2y$10$MA0j8Z3.ChIWOflXNfmOQOP3IKxuRUKuIHzsGu9hrsKIvS6PlUvP6',
    'asgard',
    '2024-12-06 10:15:39'
  ),
  (
    4,
    'KrYxX',
    'ssh@vkg-tb.eu',
    '$2y$10$dFacT.EjYfPOwafvKPAIRuaU.K7IukYsoPMupncO.fOwEzCTPJ3/2',
    'valhalla',
    '2024-12-06 10:23:05'
  ),
  (
    5,
    'Tartiflette LaFrite',
    'tarti@vkg-tb.eu',
    '$2y$10$T0Llxbhr0GOE11ntUzbLYeGy.krWX0jUZY/3bXSbr0.ZdLWZYA5d6',
    'admin',
    '2024-12-06 10:26:38'
  ),
  (
    6,
    'Mikaella',
    'mikaella@vkg-tb.eu',
    '$2y$10$6INUND/YKrkWb2zHbBbFm.qH5.dNK3Ce6Tzapbewe8NAFJ/tpXvEy',
    'valhalla',
    '2024-12-06 10:54:53'
  ),
  (
    7,
    'Vidar',
    'deea@vkg-tb.eu',
    '$2y$10$A4Fiqx9n6JZFPRoiQOXGOOMd.fHhifiYPc37p4eDMFI5SxSeF/NSO',
    'admin',
    '2024-12-07 10:33:53'
  );
ALTER TABLE `users`
ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 8;
-- crypting@vkg-tb.eu / CryptingVkgTb!$@
-- poppy@vkg-tb.eu / 0p1umFl0w3r
-- ssh@vkg-tb.eu / SShVggTb@!$
-- tarti@vkg-tb.eu / Vkg-tb87
-- mikaella@vkg-tb.eu / MikaVkgTb$!@
-- deea@vkg-tb.eu / DeeAVkgTb$!!@