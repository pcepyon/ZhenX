-- Concerns data (30 items, 5 per category)

-- 탄력 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('cheek_jaw_sagging', 'elasticity', '볼·턱 처짐', NULL, 1.0, 1),
('double_chin', 'elasticity', '이중턱', NULL, 1.0, 2),
('neck_sagging', 'elasticity', '목 처짐', NULL, 0.9, 3),
('fine_lines_early', 'elasticity', '잔주름 및 잔흔', NULL, 0.8, 4),
('subcutaneous_fat_sagging', 'elasticity', '피하지방 처짐', NULL, 0.9, 5);

-- 볼륨 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('cheek_hollowing', 'volume', '볼 꺼짐', NULL, 1.0, 1),
('temple_hollowing', 'volume', '관자놀이 꺼짐', NULL, 0.9, 2),
('under_eye_hollowing', 'volume', '눈 밑 꺼짐', NULL, 0.8, 3),
('lip_volume_loss', 'volume', '입술 볼륨 소실', NULL, 0.7, 4),
('body_volume_loss', 'volume', '팔·종아리 빈약함', NULL, 0.6, 5);

-- 주름 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('fine_wrinkles', 'wrinkles', '잔주름(얕은 주름)', NULL, 0.8, 1),
('deep_wrinkles', 'wrinkles', '깊은 주름(팔자주름·미간주름)', NULL, 1.0, 2),
('forehead_wrinkles', 'wrinkles', '이마 주름', NULL, 0.9, 3),
('crow_feet', 'wrinkles', '눈가 주름(까치발 주름)', NULL, 0.8, 4),
('neck_wrinkles', 'wrinkles', '목 주름', NULL, 0.7, 5);

-- 피부결·모공 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('rough_texture', 'skin_texture', '거친 피부결', NULL, 0.9, 1),
('large_pores', 'skin_texture', '넓은 모공', NULL, 1.0, 2),
('blackheads_whiteheads', 'skin_texture', '블랙헤드·화이트헤드', NULL, 0.8, 3),
('acne_scars', 'skin_texture', '여드름 흉터·자국', NULL, 1.0, 4),
('dull_uneven_tone', 'skin_texture', '칙칙함·톤 불균형', NULL, 0.8, 5);

-- 색소 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('melasma_freckles', 'pigmentation', '기미·주근깨', NULL, 1.0, 1),
('dark_spots', 'pigmentation', '다크스팟(검은 반점)', NULL, 1.0, 2),
('post_acne_pigmentation', 'pigmentation', '여드름 후 색소침착', NULL, 0.9, 3),
('rosacea_redness', 'pigmentation', '홍조·혈관성 붉음증', NULL, 0.8, 4),
('scar_pigmentation', 'pigmentation', '흉터 색소', NULL, 0.7, 5);

-- 바디 카테고리 concerns (5개)
INSERT INTO concerns (id, category_id, name, description, weight, display_order) VALUES
('cellulite', 'body', '셀룰라이트', NULL, 0.9, 1),
('localized_fat', 'body', '지방 축적(복부·허벅지·팔뚝)', NULL, 1.0, 2),
('stretch_marks', 'body', '튼살(스트레치마크)', NULL, 0.8, 3),
('body_sagging', 'body', '바디 처짐(팔·엉덩이 등)', NULL, 0.9, 4),
('body_elasticity_loss', 'body', '바디 탄력 저하', NULL, 0.8, 5);