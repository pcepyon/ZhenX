SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "name", "icon", "description", "display_order", "is_active", "created_at") VALUES
	('elasticity', '탄력', '🎈', '피부 처짐과 탄력 개선', 1, true, '2025-07-03 05:54:37.142045'),
	('volume', '볼륨', '💧', '볼륨 손실 개선', 2, true, '2025-07-03 05:54:37.142045'),
	('wrinkles', '주름', '〰️', '주름 개선', 3, true, '2025-07-03 05:54:37.142045'),
	('skin_texture', '피부결·모공', '✨', '피부결과 모공 개선', 4, true, '2025-07-03 05:54:37.142045'),
	('pigmentation', '색소', '🎨', '색소 침착 개선', 5, true, '2025-07-03 05:54:37.142045'),
	('body', '바디', '💃', '바디 라인 개선', 6, true, '2025-07-03 05:54:37.142045');


--
-- Data for Name: concerns; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."concerns" ("id", "category_id", "name", "description", "weight", "display_order", "created_at") VALUES
	('cheek_jaw_sagging', 'elasticity', '볼·턱 처짐', NULL, 1.00, 1, '2025-07-03 05:55:18.785202'),
	('double_chin', 'elasticity', '이중턱', NULL, 1.00, 2, '2025-07-03 05:55:18.785202'),
	('neck_sagging', 'elasticity', '목 처짐', NULL, 0.90, 3, '2025-07-03 05:55:18.785202'),
	('fine_lines_early', 'elasticity', '잔주름 및 잔흔', NULL, 0.80, 4, '2025-07-03 05:55:18.785202'),
	('subcutaneous_fat_sagging', 'elasticity', '피하지방 처짐', NULL, 0.90, 5, '2025-07-03 05:55:18.785202'),
	('cheek_hollowing', 'volume', '볼 꺼짐', NULL, 1.00, 1, '2025-07-03 05:55:18.785202'),
	('temple_hollowing', 'volume', '관자놀이 꺼짐', NULL, 0.90, 2, '2025-07-03 05:55:18.785202'),
	('under_eye_hollowing', 'volume', '눈 밑 꺼짐', NULL, 0.80, 3, '2025-07-03 05:55:18.785202'),
	('lip_volume_loss', 'volume', '입술 볼륨 소실', NULL, 0.70, 4, '2025-07-03 05:55:18.785202'),
	('body_volume_loss', 'volume', '팔·종아리 빈약함', NULL, 0.60, 5, '2025-07-03 05:55:18.785202'),
	('fine_wrinkles', 'wrinkles', '잔주름(얕은 주름)', NULL, 0.80, 1, '2025-07-03 05:55:18.785202'),
	('deep_wrinkles', 'wrinkles', '깊은 주름(팔자주름·미간주름)', NULL, 1.00, 2, '2025-07-03 05:55:18.785202'),
	('forehead_wrinkles', 'wrinkles', '이마 주름', NULL, 0.90, 3, '2025-07-03 05:55:18.785202'),
	('crow_feet', 'wrinkles', '눈가 주름(까치발 주름)', NULL, 0.80, 4, '2025-07-03 05:55:18.785202'),
	('neck_wrinkles', 'wrinkles', '목 주름', NULL, 0.70, 5, '2025-07-03 05:55:18.785202'),
	('rough_texture', 'skin_texture', '거친 피부결', NULL, 0.90, 1, '2025-07-03 05:55:18.785202'),
	('large_pores', 'skin_texture', '넓은 모공', NULL, 1.00, 2, '2025-07-03 05:55:18.785202'),
	('blackheads_whiteheads', 'skin_texture', '블랙헤드·화이트헤드', NULL, 0.80, 3, '2025-07-03 05:55:18.785202'),
	('acne_scars', 'skin_texture', '여드름 흉터·자국', NULL, 1.00, 4, '2025-07-03 05:55:18.785202'),
	('dull_uneven_tone', 'skin_texture', '칙칙함·톤 불균형', NULL, 0.80, 5, '2025-07-03 05:55:18.785202'),
	('melasma_freckles', 'pigmentation', '기미·주근깨', NULL, 1.00, 1, '2025-07-03 05:55:18.785202'),
	('dark_spots', 'pigmentation', '다크스팟(검은 반점)', NULL, 1.00, 2, '2025-07-03 05:55:18.785202'),
	('post_acne_pigmentation', 'pigmentation', '여드름 후 색소침착', NULL, 0.90, 3, '2025-07-03 05:55:18.785202'),
	('rosacea_redness', 'pigmentation', '홍조·혈관성 붉음증', NULL, 0.80, 4, '2025-07-03 05:55:18.785202'),
	('scar_pigmentation', 'pigmentation', '흉터 색소', NULL, 0.70, 5, '2025-07-03 05:55:18.785202'),
	('cellulite', 'body', '셀룰라이트', NULL, 0.90, 1, '2025-07-03 05:55:18.785202'),
	('localized_fat', 'body', '지방 축적(복부·허벅지·팔뚝)', NULL, 1.00, 2, '2025-07-03 05:55:18.785202'),
	('stretch_marks', 'body', '튼살(스트레치마크)', NULL, 0.80, 3, '2025-07-03 05:55:18.785202'),
	('body_sagging', 'body', '바디 처짐(팔·엉덩이 등)', NULL, 0.90, 4, '2025-07-03 05:55:18.785202'),
	('body_elasticity_loss', 'body', '바디 탄력 저하', NULL, 0.80, 5, '2025-07-03 05:55:18.785202');


--
-- Data for Name: hospitals; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hospitals" ("id", "name_ko", "name_cn", "logo_url", "established_year", "address_ko", "address_cn", "subway_info", "coordinates", "created_at", "updated_at") VALUES
	('87c97724-30d9-4c71-9932-80fad142fca2', '닥터디자이너의원 영등포', 'Dr. Designer Clinic', NULL, 2014, '서울 영등포구 경인로 870 2층 닥터디자이너의원', '870, Gyeongin-ro, Yeongdeungpo-gu, Seoul', '{"exit": "5번", "line": "2호선", "station": "영등포역"}', NULL, '2025-07-06 01:28:59.061653+00', '2025-07-06 01:28:59.061653+00');


--
-- Data for Name: hospital_certifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hospital_certifications" ("id", "hospital_id", "foreign_patient_registration", "registration_number", "medical_institution_number", "director_license_number", "same_price_policy", "medical_insurance", "post_care_protocol", "updated_at") VALUES
	('52c8d75e-e68c-4d18-9358-8b3072d0ea48', '87c97724-30d9-4c71-9932-80fad142fca2', true, '111111', '12366471', '105728', true, true, true, '2025-07-06 01:29:12.101558+00');


--
-- Data for Name: hospital_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hospital_images" ("id", "hospital_id", "image_url", "image_type", "display_order", "created_at") VALUES
	('d2f554c7-aa84-439e-8ecd-3172330e791f', '87c97724-30d9-4c71-9932-80fad142fca2', '/images/placeholder-hospital.jpg', 'exterior', 1, '2025-07-06 01:29:12.101558+00'),
	('e2000c4c-cae4-41b6-ac3a-e5bb775d74b1', '87c97724-30d9-4c71-9932-80fad142fca2', '/images/placeholder-hospital.jpg', 'interior', 2, '2025-07-06 01:29:12.101558+00'),
	('4be6cbc5-43f3-4547-abf7-3f3ef552a137', '87c97724-30d9-4c71-9932-80fad142fca2', '/images/placeholder-hospital.jpg', 'facility', 3, '2025-07-06 01:29:12.101558+00');


--
-- Data for Name: hospital_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."hospital_services" ("id", "hospital_id", "chinese_coordinators", "wechat_official_account", "hotline_number", "emergency_support", "service_hours", "updated_at") VALUES
	('0bf1aae7-b40c-4e1c-befa-73873291a967', '87c97724-30d9-4c71-9932-80fad142fca2', 3, 'drdclinic', '+82-2-3667-4842', false, '{"sunday": "휴무", "weekday": "10:00~20:30", "saturday": "10:00~16:30"}', '2025-07-06 01:29:12.101558+00');


--
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."packages" ("id", "package_code", "name_ko", "name_cn", "description_ko", "description_cn", "category_id", "concern_tags", "price_tier", "discount_rate", "duration_minutes", "highlight_benefits", "final_price", "is_featured", "display_order", "is_active", "created_at", "hospital_id") VALUES
	('f1ae5eaa-0679-4a2c-9923-2fc56b588223', 'ELASTICITY_BASIC', '원데이 미니 리프팅', '一日迷你提升套餐', NULL, NULL, 'elasticity', '{cheek_jaw_sagging,double_chin,fine_lines_early}', 'basic', 0.10, 85, '{"cn": ["立即V脸效果", "无恢复期", "1.5小时完成"], "ko": ["즉시 V라인 효과", "회복기간 없음", "1시간 반 시술"]}', 439560, false, 1, true, '2025-07-03 05:57:08.273037', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('065cbccf-b7fe-4835-95ab-34112723be29', 'ELASTICITY_PREMIUM', '원데이 V라인 마스터', '一日V脸大师套餐', NULL, NULL, 'elasticity', '{cheek_jaw_sagging,double_chin,subcutaneous_fat_sagging}', 'premium', 0.10, 175, '{"cn": ["显著提升效果", "同时减少脂肪", "效果持续3个月"], "ko": ["드라마틱한 리프팅 효과", "지방 감소 동시 진행", "3개월 지속"]}', 1503810, false, 2, true, '2025-07-03 05:57:08.273037', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 'ELASTICITY_LUXURY', '원데이 토탈 리프팅', '一日全面提升套餐', NULL, NULL, 'elasticity', '{cheek_jaw_sagging,neck_sagging,deep_wrinkles}', 'luxury', 0.10, 150, '{"cn": ["年轻10岁效果", "改善颈纹", "效果持续1年以上"], "ko": ["10년 젊어지는 효과", "목주름까지 개선", "1년 이상 지속"]}', 3336300, false, 3, true, '2025-07-03 05:57:08.273037', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('2adf4189-918e-4269-a14d-42c9de88c6a7', 'ELASTICITY_ULTRA', '원데이 풀페이스 리뉴얼', '一日全脸焕新套餐', NULL, NULL, 'elasticity', '{cheek_jaw_sagging,neck_sagging,deep_wrinkles,volume_loss}', 'ultra', 0.10, 250, '{"cn": ["最强抗衰老", "超声刀+热玛吉协同", "效果持续2年以上"], "ko": ["최강 안티에이징", "울쎄라+써마지 시너지", "2년 이상 효과"]}', 6672600, false, 4, true, '2025-07-03 05:57:08.273037', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('1e994bd2-37d3-434c-b40e-7a01748a1070', 'VOLUME_BASIC', '원데이 볼륨 부스터', '一日容积补充套餐', NULL, NULL, 'volume', '{cheek_hollowing,under_eye_hollowing}', 'basic', 0.10, 70, '{"cn": ["自然丰盈", "同时补水", "立即见效"], "ko": ["자연스러운 볼륨", "수분 동시 보충", "즉각적 효과"]}', 534600, false, 5, true, '2025-07-03 05:57:19.74841', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('c57c39d9-85ff-45ae-9c85-62a257b06913', 'VOLUME_PREMIUM', '원데이 베이비페이스', '一日童颜套餐', NULL, NULL, 'volume', '{cheek_hollowing,temple_hollowing,lip_volume_loss}', 'premium', 0.10, 120, '{"cn": ["立体童颜", "效果持续1年以上", "自然丰满感"], "ko": ["입체적인 동안 얼굴", "1년 이상 지속", "자연스러운 볼륨감"]}', 1335510, false, 6, true, '2025-07-03 05:57:19.74841', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', 'WRINKLE_BASIC', '원데이 주름 케어', '一日除皱护理套餐', NULL, NULL, 'wrinkles', '{fine_wrinkles,forehead_wrinkles,crow_feet}', 'basic', 0.10, 70, '{"cn": ["改善表情纹", "改善肤质", "眼部集中护理"], "ko": ["표정주름 개선", "피부결 개선", "눈가 집중 케어"]}', 523710, false, 7, true, '2025-07-03 05:57:36.761775', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('2413e627-95a1-4ea5-bc99-09b0e08ee84a', 'TEXTURE_BASIC', '원데이 스킨 리파인', '一日肌肤细致套餐', NULL, NULL, 'skin_texture', '{large_pores,rough_texture,blackheads_whiteheads}', 'basic', 0.10, 130, '{"cn": ["立即改善毛孔", "光滑肌理", "补充水分"], "ko": ["즉각적 모공 개선", "매끄러운 피부결", "수분 공급"]}', 495000, false, 8, true, '2025-07-03 05:57:36.761775', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('f4c11b4e-6f9e-43c9-b44f-eec103e3742a', 'BODY_BASIC', '원데이 바디 슬림', '一日纤体套餐', NULL, NULL, 'body', '{localized_fat,cellulite}', 'basic', 0.10, 90, '{"cn": ["局部减脂", "改善弹性", "促进循环"], "ko": ["부분 지방 감소", "탄력 개선", "순환 개선"]}', 445500, false, 10, true, '2025-07-03 05:57:36.761775', '87c97724-30d9-4c71-9932-80fad142fca2'),
	('5ac6d04b-eb4e-43e3-a52f-385eef81551e', 'PIGMENT_BASIC', '원데이 브라이트닝', '一日美白套餐', NULL, NULL, 'pigmentation', '{melasma_freckles,dark_spots,dull_uneven_tone}', 'basic', 0.10, 130, '{"cn": ["改善色斑", "均匀肤色", "立即美白"], "ko": ["기미잡티 개선", "피부톤 균일", "즉각적 화이트닝"]}', 414810, false, 9, true, '2025-07-03 05:57:36.761775', '87c97724-30d9-4c71-9932-80fad142fca2');


--
-- Data for Name: treatments_base; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."treatments_base" ("id", "code", "name_ko", "name_cn", "category_id", "base_price", "discount_price", "vat_rate", "duration_minutes", "recovery_days", "brand", "unit", "quantity", "is_active", "created_at", "updated_at") VALUES
	('fb270b8c-344e-4403-a991-a969def6bd07', 'LIFTERA_1000', '리프테라2 1000샷', '丽芙特拉2 1000发', 'elasticity', 59000, NULL, 0.10, 30, 0, NULL, '샷', 1000, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('90aedd78-95b7-4d45-b572-d6d1aa117038', 'THREAD_LIFT_4', '잼버볼륨 실리프팅 4줄', '线雕提升 4根', 'elasticity', 296000, NULL, 0.10, 40, 0, NULL, '줄', 4, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('98d161d3-16a9-42c3-9af0-e28c8f83a74c', 'THREAD_LIFT_6', '잼버볼륨 실리프팅 6줄', '线雕提升 6根', 'elasticity', 490000, NULL, 0.10, 60, 0, NULL, '줄', 6, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('8a5ea562-8da7-4dcb-8c2b-b76af4319ad4', 'ULTHERA_300', '3D울쎄라 300샷', '3D超声刀 300发', 'elasticity', 790000, NULL, 0.10, 60, 0, NULL, '샷', 300, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('eb0ecb65-9515-4e6a-bdb5-a7f58d41a7dd', 'ULTHERA_600', '3D울쎄라 600샷', '3D超声刀 600发', 'elasticity', 2880000, NULL, 0.10, 90, 0, NULL, '샷', 600, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('33edec93-ef41-4f5b-acbf-d1b77ee9b175', 'ULTHERA_1000', '3D울쎄라 1000샷', '3D超声刀 1000发', 'elasticity', 4390000, NULL, 0.10, 120, 0, NULL, '샷', 1000, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('92b8e96d-2cf5-4e4e-a1c5-e43fc077b38e', 'THERMAGE_600', '써마지 600샷', '热玛吉 600发', 'elasticity', 1900000, NULL, 0.10, 90, 0, NULL, '샷', 600, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('39bc5324-bbc8-40ce-87e0-edd81ed6fdd2', 'LINEAR_300', '리니어지 300샷', '线性提升 300发', 'elasticity', 250000, NULL, 0.10, 40, 0, NULL, '샷', 300, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('0a4800b0-9694-4f8b-b08d-529de965ba82', 'INMODE_FACE', '인모드 FX+FORMA 얼굴전체', '因模德全脸', 'elasticity', 390000, NULL, 0.10, 60, 0, NULL, '회', 1, true, '2025-07-03 05:55:47.566827', '2025-07-03 05:55:47.566827'),
	('6a341502-7b40-4983-bfb9-70acac8b2c34', 'BOTOX_UPPER_KR', '[국산] 주름 보톡스 얼굴상부', '[国产] 面部上部除皱肉毒素', 'wrinkles', 130000, NULL, 0.10, 20, 0, '국산', '부위', 1, true, '2025-07-03 05:55:59.040304', '2025-07-03 05:55:59.040304'),
	('13b9db19-8a50-421e-a24c-3ac0dfcc76dc', 'BOTOX_SKIN_KR', '[국산] 얼굴전체 스킨 보톡스', '[国产] 全脸水光肉毒素', 'wrinkles', 149000, NULL, 0.10, 30, 0, '국산', '부위', 1, true, '2025-07-03 05:55:59.040304', '2025-07-03 05:55:59.040304'),
	('2d42c1d0-a82c-49ec-a7ae-de6866312297', 'BOTOX_JAW_ZEOMIN', '[제오민] 턱 보톡스 50유닛', '[Xeomin] 瘦脸针 50单位', 'wrinkles', 89000, NULL, 0.10, 15, 0, '제오민', '유닛', 50, true, '2025-07-03 05:55:59.040304', '2025-07-03 05:55:59.040304'),
	('c2ce2a98-7537-4f25-bbf4-748b50b998e6', 'BOTOX_UPPER_ALLERGAN', '[엘러간] 주름 보톡스 얼굴상부', '[保妥适] 面部上部除皱', 'wrinkles', 270000, NULL, 0.10, 20, 0, '엘러간', '부위', 1, true, '2025-07-03 05:55:59.040304', '2025-07-03 05:55:59.040304'),
	('9ac4456b-f344-4883-8f52-fadf8e279853', 'REJURAN_2CC', '리쥬란 힐러 2cc 1+1', '丽珠兰修复针 2cc 1+1', 'volume', 450000, NULL, 0.10, 40, 0, NULL, 'cc', 2, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('a8eaee3f-4e8f-4c0d-90d2-55caad142375', 'REJURAN_EYE', '리쥬란 아이 1cc 1+1', '丽珠兰眼部 1cc 1+1', 'volume', 250000, NULL, 0.10, 30, 0, NULL, 'cc', 1, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('cd37ca5e-d646-4381-923c-606a4c4cba1b', 'FILLER_CHEEK_3CC', '[국산] 앞볼/옆볼 필러 3cc', '[国产] 苹果肌填充 3cc', 'volume', 360000, NULL, 0.10, 30, 0, '국산', 'cc', 3, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('eabe80ab-4f4d-4042-95af-7a80a5dbb977', 'FILLER_TEMPLE_3CC', '[국산] 이마/관자필러 3cc', '[国产] 额头/太阳穴填充 3cc', 'volume', 390000, NULL, 0.10, 30, 0, '국산', 'cc', 3, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('60dd2968-501c-43d4-9804-5ca6227128b8', 'FILLER_10CC', '[국산] 필러 10cc', '[国产] 填充剂 10cc', 'volume', 990000, NULL, 0.10, 60, 0, '국산', 'cc', 10, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('dc3d0c19-c514-4765-95d6-768404efb594', 'WATER_SHINE', '순수 물광주사 2.5CC', '水光针 2.5CC', 'volume', 90000, NULL, 0.10, 30, 0, NULL, 'cc', 3, true, '2025-07-03 05:56:12.107285', '2025-07-03 05:56:12.107285'),
	('67d59403-277a-4a95-b363-7a7a956965a9', 'PICO_FRAXEL', '피코프락셀 + 진정관리 1회', '皮秒点阵激光 + 镇静管理', 'skin_texture', 220000, NULL, 0.10, 60, 0, NULL, '회', 1, true, '2025-07-03 05:56:25.279443', '2025-07-03 05:56:25.279443'),
	('879efe32-bcde-45e7-a1ca-661e2ad1ca37', 'PICO_TONING', '피코토닝 1회', '皮秒净肤 1次', 'skin_texture', 89000, NULL, 0.10, 30, 0, NULL, '회', 1, true, '2025-07-03 05:56:25.279443', '2025-07-03 05:56:25.279443'),
	('90822c37-d8e1-4840-9185-46f3615514e9', 'AQUA_PEEL_5', '내맘대로 아쿠아필 5회', '定制水飞梭 5次', 'skin_texture', 190000, NULL, 0.10, 40, 0, NULL, '회', 5, true, '2025-07-03 05:56:25.279443', '2025-07-03 05:56:25.279443'),
	('68fd4743-4181-4bca-a893-80a4b6867bf0', 'LDM_CARE', 'LDM 관리', 'LDM管理', 'skin_texture', 90000, NULL, 0.10, 30, 0, NULL, '회', 1, true, '2025-07-03 05:56:25.279443', '2025-07-03 05:56:25.279443'),
	('a107c663-116b-4a6f-a1df-7d19d19d7fbe', 'BODY_INMODE', '바디 인모드 1회', '身体因模德 1次', 'body', 150000, NULL, 0.10, 60, 0, NULL, '회', 1, true, '2025-07-03 05:56:33.917292', '2025-07-03 05:56:33.917292'),
	('be8dbc0a-9554-4c34-808a-ba2419b5fcd9', 'BODY_INMODE_5', '바디 인모드 5회', '身体因模德 5次', 'body', 600000, NULL, 0.10, 60, 0, NULL, '회', 5, true, '2025-07-03 05:56:33.917292', '2025-07-03 05:56:33.917292'),
	('073e0d78-890c-48ab-8150-bf9c04d4f271', 'S_SLIM_10', 'S슬림 주사 10회', 'S瘦身针 10次', 'body', 300000, NULL, 0.10, 30, 0, NULL, '회', 10, true, '2025-07-03 05:56:33.917292', '2025-07-03 05:56:33.917292'),
	('7b13e553-be7e-45fc-9742-43482eb8ef00', 'LINEAR_BODY_1000', '리니어지 바디 1000샷', '身体线性提升 1000发', 'body', 790000, NULL, 0.10, 90, 0, NULL, '샷', 1000, true, '2025-07-03 05:56:33.917292', '2025-07-03 05:56:33.917292'),
	('2b7113bc-0163-4a92-a2aa-f5bf589cea4d', 'DUAL_TONING', '피코 듀얼토닝 1회', '皮秒双波净肤 1次', 'pigmentation', 150000, NULL, 0.10, 40, 0, NULL, '회', 1, true, '2025-07-03 05:56:25.279443', '2025-07-03 05:56:25.279443');


--
-- Data for Name: package_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."package_items" ("id", "package_id", "treatment_id", "quantity", "is_optional", "display_order", "created_at") VALUES
	('1f78fb98-4293-4d3d-9b2e-4b38a05c651a', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 'fb270b8c-344e-4403-a991-a969def6bd07', 1, false, 1, '2025-07-03 05:58:11.718947'),
	('a201335e-f0e5-47a8-a89f-d82920c48c8b', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', '90aedd78-95b7-4d45-b572-d6d1aa117038', 1, false, 2, '2025-07-03 05:58:11.718947'),
	('007022d7-fd03-4e68-a657-97073305b657', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', '2d42c1d0-a82c-49ec-a7ae-de6866312297', 1, false, 3, '2025-07-03 05:58:11.718947'),
	('484e785f-e8ca-4d5d-b3fb-9bf3aac29b7b', '065cbccf-b7fe-4835-95ab-34112723be29', '8a5ea562-8da7-4dcb-8c2b-b76af4319ad4', 1, false, 1, '2025-07-03 05:58:23.367071'),
	('780339e4-fd2a-4bb0-a5fb-c93ed2c89c25', '065cbccf-b7fe-4835-95ab-34112723be29', '39bc5324-bbc8-40ce-87e0-edd81ed6fdd2', 1, false, 2, '2025-07-03 05:58:23.367071'),
	('d29a80a4-fa7c-4edf-92c8-f535d5f2271f', '065cbccf-b7fe-4835-95ab-34112723be29', '0a4800b0-9694-4f8b-b08d-529de965ba82', 1, false, 3, '2025-07-03 05:58:23.367071'),
	('e489174f-3428-484e-8c1d-820b8cf2a0d9', '065cbccf-b7fe-4835-95ab-34112723be29', '2d42c1d0-a82c-49ec-a7ae-de6866312297', 1, false, 4, '2025-07-03 05:58:23.367071'),
	('2b542e8e-1e13-4a75-95d2-24bdaf80f776', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 'eb0ecb65-9515-4e6a-bdb5-a7f58d41a7dd', 1, false, 1, '2025-07-03 05:58:41.143795'),
	('4534e87c-9216-4d09-a168-cee89d8e05ea', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', '98d161d3-16a9-42c3-9af0-e28c8f83a74c', 1, false, 2, '2025-07-03 05:58:41.143795'),
	('a6016715-5e41-4bb0-b413-78d0b838667a', '2adf4189-918e-4269-a14d-42c9de88c6a7', '33edec93-ef41-4f5b-acbf-d1b77ee9b175', 1, false, 1, '2025-07-03 05:58:41.143795'),
	('87ba9fed-ab25-4a84-bdf7-5d54366eddd2', '2adf4189-918e-4269-a14d-42c9de88c6a7', '92b8e96d-2cf5-4e4e-a1c5-e43fc077b38e', 1, false, 2, '2025-07-03 05:58:41.143795'),
	('85298447-6902-4208-a45d-017470a7a4dc', '2adf4189-918e-4269-a14d-42c9de88c6a7', '9ac4456b-f344-4883-8f52-fadf8e279853', 1, false, 3, '2025-07-03 05:58:41.143795'),
	('5e70899e-8ecd-48eb-aef6-5a9f583a2779', '1e994bd2-37d3-434c-b40e-7a01748a1070', '9ac4456b-f344-4883-8f52-fadf8e279853', 1, false, 1, '2025-07-03 05:58:58.751057'),
	('fb567da2-bd15-490f-aa35-63ce3ea520ca', '1e994bd2-37d3-434c-b40e-7a01748a1070', 'dc3d0c19-c514-4765-95d6-768404efb594', 1, false, 2, '2025-07-03 05:58:58.751057'),
	('98e98ea3-7b31-4685-afb4-40deff620b77', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 'cd37ca5e-d646-4381-923c-606a4c4cba1b', 1, false, 1, '2025-07-03 05:58:58.751057'),
	('b6448737-668c-4e95-a16f-d49a33b70558', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 'eabe80ab-4f4d-4042-95af-7a80a5dbb977', 1, false, 2, '2025-07-03 05:58:58.751057'),
	('70eff5bf-5270-44c2-97db-94f936f7fb28', 'c57c39d9-85ff-45ae-9c85-62a257b06913', '9ac4456b-f344-4883-8f52-fadf8e279853', 1, false, 3, '2025-07-03 05:58:58.751057'),
	('3db5a60b-c809-4554-852e-6adc70a7cae8', 'c57c39d9-85ff-45ae-9c85-62a257b06913', '13b9db19-8a50-421e-a24c-3ac0dfcc76dc', 1, false, 4, '2025-07-03 05:58:58.751057'),
	('fe043446-2a64-450a-9fa7-c074fa72458f', '3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', '6a341502-7b40-4983-bfb9-70acac8b2c34', 1, false, 1, '2025-07-03 05:59:17.098979'),
	('a9d8e296-1d45-4523-a3b9-ffa67f371671', '3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', '13b9db19-8a50-421e-a24c-3ac0dfcc76dc', 1, false, 2, '2025-07-03 05:59:17.098979'),
	('4c8637bc-9912-4b80-870d-49a282938b9c', '3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', 'a8eaee3f-4e8f-4c0d-90d2-55caad142375', 1, false, 3, '2025-07-03 05:59:17.098979'),
	('f196fd62-e724-4c47-b53f-45f40dfd4352', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', '67d59403-277a-4a95-b363-7a7a956965a9', 1, false, 1, '2025-07-03 05:59:17.098979'),
	('56ba64c5-510c-4595-90fa-c3bea959e306', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', '90822c37-d8e1-4840-9185-46f3615514e9', 1, false, 2, '2025-07-03 05:59:17.098979'),
	('80758904-6c99-4ca0-b04d-5daffc5d87fa', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 'dc3d0c19-c514-4765-95d6-768404efb594', 1, false, 3, '2025-07-03 05:59:17.098979'),
	('7f78d01e-6b0f-4b89-b12d-4d0d66a4559d', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', '879efe32-bcde-45e7-a1ca-661e2ad1ca37', 1, false, 1, '2025-07-03 05:59:36.72408'),
	('816f994e-3d23-4f63-9658-de442cb53048', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', '2b7113bc-0163-4a92-a2aa-f5bf589cea4d', 1, false, 2, '2025-07-03 05:59:36.72408'),
	('9335beb2-c5d7-49cd-937c-abc91ca1e7bb', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', 'dc3d0c19-c514-4765-95d6-768404efb594', 1, false, 3, '2025-07-03 05:59:36.72408'),
	('e214e853-0165-4f13-9091-3a81bd188927', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', '68fd4743-4181-4bca-a893-80a4b6867bf0', 1, false, 4, '2025-07-03 05:59:36.72408'),
	('06c6c360-4d16-4864-be1b-ae284a9d499d', 'f4c11b4e-6f9e-43c9-b44f-eec103e3742a', 'a107c663-116b-4a6f-a1df-7d19d19d7fbe', 1, false, 1, '2025-07-03 05:59:36.72408'),
	('2a336e68-d501-484b-b188-0454c03a38c9', 'f4c11b4e-6f9e-43c9-b44f-eec103e3742a', '073e0d78-890c-48ab-8150-bf9c04d4f271', 1, false, 2, '2025-07-03 05:59:36.72408');


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_sessions" ("session_id", "user_agent", "ip_address", "country_code", "language", "created_at", "expires_at", "last_activity") VALUES
	('4a5e6bd2-428d-4fd8-a451-0aba5b3d40aa', 'curl/8.7.1', '::1', 'CN', 'zh-CN', '2025-07-03 06:30:26.534699', '2025-07-04 06:30:26.534699', '2025-07-03 06:30:26.534699'),
	('654c69a9-7edf-46f1-ab3b-281631607157', 'curl/8.7.1', '::1', 'CN', 'zh-CN', '2025-07-03 06:30:33.258635', '2025-07-04 06:30:33.258635', '2025-07-03 06:30:33.258635'),
	('b56ba9f1-407a-49d7-a6e1-2f203af99780', 'curl/8.7.1', '::1', 'CN', 'zh-CN', '2025-07-03 07:04:24.964832', '2025-07-04 07:04:24.964832', '2025-07-03 07:40:10.038'),
	('f1936057-0cb4-41c0-9955-d8ca5b173b72', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 14:35:47.470155', '2025-07-04 14:35:47.470155', '2025-07-03 14:35:47.470155'),
	('4e4cd880-50c4-4a50-a8f6-229135a72022', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 14:35:47.47095', '2025-07-04 14:35:47.47095', '2025-07-03 14:35:47.47095'),
	('c7199316-1958-42b1-801e-cc10ce223911', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 14:54:06.208871', '2025-07-04 14:54:06.208871', '2025-07-03 14:54:06.208871'),
	('4cf32440-1e19-447b-b1df-057b3d86f74b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:31.898871', '2025-07-04 15:39:31.898871', '2025-07-03 15:39:31.898871'),
	('28a858dd-4f99-48cb-9c2c-355a77836385', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:33.111811', '2025-07-04 15:39:33.111811', '2025-07-03 15:39:33.111811'),
	('89fb8bc9-d953-43a5-abab-1ceb8ca1f058', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:33.905349', '2025-07-04 15:39:33.905349', '2025-07-03 15:39:33.905349'),
	('d0ea2811-2239-4d3f-a414-dd4c356b60a3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:34.378416', '2025-07-04 15:39:34.378416', '2025-07-03 15:39:34.378416'),
	('442c6ec4-74f2-4aae-9f2f-1baea6b27051', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:34.855437', '2025-07-04 15:39:34.855437', '2025-07-03 15:39:34.855437'),
	('6a7b70bf-2db7-4c41-a3be-a2571038814b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:35.268698', '2025-07-04 15:39:35.268698', '2025-07-03 15:39:35.268698'),
	('e4951f50-3a13-4768-ab85-c7454da11f7a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:35.776618', '2025-07-04 15:39:35.776618', '2025-07-03 15:39:35.776618'),
	('e1d1c001-213f-494c-b87c-11aa6cfe7e4b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:58.3436', '2025-07-04 15:39:58.3436', '2025-07-03 15:39:58.3436'),
	('c0c382f2-093e-4f2c-b501-7265272d7275', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:39:59.677837', '2025-07-04 15:39:59.677837', '2025-07-03 15:39:59.677837'),
	('1f637d59-46c1-4542-9b8f-6a8ed57acb45', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:40:01.33782', '2025-07-04 15:40:01.33782', '2025-07-03 15:40:01.33782'),
	('47d4ed37-43ef-4852-b4b5-7fce56bc802f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:40:02.84085', '2025-07-04 15:40:02.84085', '2025-07-03 15:40:02.84085'),
	('cc1012d8-9d64-4726-9b18-3ae763bbc514', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 15:40:04.908078', '2025-07-04 15:40:04.908078', '2025-07-03 15:40:04.908078'),
	('218e462b-f77d-4662-841f-07b7eb06e02c', 'curl/8.7.1', '::1', 'CN', 'zh-CN', '2025-07-03 15:31:07.50946', '2025-07-04 15:31:07.50946', '2025-07-03 15:51:45.669'),
	('f4ae4a2a-137b-49ef-bc8f-0499dad0da0b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:02.73212', '2025-07-04 18:03:02.73212', '2025-07-03 18:03:02.73212'),
	('bcc2ebdc-a749-4cc7-9932-37ec1d26a4da', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:04.870578', '2025-07-04 18:03:04.870578', '2025-07-03 18:03:04.870578'),
	('2786ed3c-cf31-4f28-b77b-b9ee9299805e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:10.793096', '2025-07-04 18:03:10.793096', '2025-07-03 18:03:10.793096'),
	('613b2fc4-84bb-4a10-a169-b045de9b047c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:55.670135', '2025-07-04 18:03:55.670135', '2025-07-03 18:03:55.670135'),
	('d6f7ca2b-c78a-468d-bf86-c0f65f47b196', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:56.648593', '2025-07-04 18:03:56.648593', '2025-07-03 18:03:56.648593'),
	('a3afb7e5-67c0-4c58-b2c4-efb547c085b4', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:57.126973', '2025-07-04 18:03:57.126973', '2025-07-03 18:03:57.126973'),
	('9769c8df-a491-4f1a-bf89-ad033202c01d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:03:57.715363', '2025-07-04 18:03:57.715363', '2025-07-03 18:03:57.715363'),
	('e0739ab6-fefd-496f-a803-16e08e996a1d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:15:27.839201', '2025-07-04 18:15:27.839201', '2025-07-03 18:15:27.839201'),
	('766fb4df-5dd9-44be-b0c8-0801d2715506', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:24:17.981386', '2025-07-04 18:24:17.981386', '2025-07-03 18:24:17.981386'),
	('7b1e571f-8396-4100-9831-2178e4c8a6e7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:24:21.952598', '2025-07-04 18:24:21.952598', '2025-07-03 18:24:21.952598'),
	('2f75f64a-e844-4faf-90c3-4fb5905d348f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:26:39.538738', '2025-07-04 18:26:39.538738', '2025-07-03 18:26:39.538738'),
	('a1464c7d-843f-4312-a63a-805114c3e3b3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:26:41.57416', '2025-07-04 18:26:41.57416', '2025-07-03 18:26:41.57416'),
	('328c4ac3-dd0e-44f1-a5ef-ea37914e6f83', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:26:43.453222', '2025-07-04 18:26:43.453222', '2025-07-03 18:26:43.453222'),
	('78cca0b9-beeb-4dbb-8f89-a8a0d33ebdbb', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:28:14.038784', '2025-07-04 18:28:14.038784', '2025-07-03 18:28:14.038784'),
	('a3c76d38-9dd8-42c2-8a66-2aaaddb6d6af', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:28:16.136242', '2025-07-04 18:28:16.136242', '2025-07-03 18:28:16.136242'),
	('efe1af94-9c4d-4054-a584-1e73807156a3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:28:28.703647', '2025-07-04 18:28:28.703647', '2025-07-03 18:28:28.703647'),
	('73a7db59-396a-4c1c-b8ac-8e8600417b2a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:28:30.105867', '2025-07-04 18:28:30.105867', '2025-07-03 18:28:30.105867'),
	('c25453f5-2475-4028-8f10-dabeabd4223b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:31:20.947622', '2025-07-04 18:31:20.947622', '2025-07-03 18:31:20.947622'),
	('a7e59b49-4fdb-47a2-ad97-ebb67bcfbba8', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:31:43.77985', '2025-07-04 18:31:43.77985', '2025-07-03 18:31:43.77985'),
	('445e82c8-48b5-4d97-9312-80d6b52a78ca', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:32:19.577858', '2025-07-04 18:32:19.577858', '2025-07-03 18:32:19.577858'),
	('994f2bdb-1428-449c-86d3-6eec37068bf9', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:55:38.430205', '2025-07-04 18:55:38.430205', '2025-07-03 18:55:38.430205'),
	('cc9ce36b-5d0e-446d-89cf-9d61e31b579a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 06:37:09.037233', '2025-07-05 06:37:09.037233', '2025-07-04 06:37:12.552'),
	('c8bce416-0625-47f5-9cdb-0b2fa11f925f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:56:17.776781', '2025-07-04 18:56:17.776781', '2025-07-03 18:56:26.245'),
	('9785633e-df7d-4a35-8e87-229c26281612', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:57:06.554449', '2025-07-04 18:57:06.554449', '2025-07-03 18:57:08.223'),
	('14448b1c-3ace-4099-ad36-d5837894ac59', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:57:16.464026', '2025-07-04 18:57:16.464026', '2025-07-03 18:57:18.589'),
	('39d71569-c137-41be-805f-5c2d18133252', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:19:20.220687', '2025-07-05 01:19:20.220687', '2025-07-04 01:19:48.893'),
	('81c10069-35bd-460d-a61e-9ef005fd7a40', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:59:08.251482', '2025-07-04 18:59:08.251482', '2025-07-03 18:59:32.388'),
	('d4252335-8095-464d-9d5a-20d10eade31b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 18:59:46.041091', '2025-07-04 18:59:46.041091', '2025-07-03 18:59:47.816'),
	('7cf390a4-d6a6-45c1-ae48-e6f823044f7f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 19:12:18.358241', '2025-07-04 19:12:18.358241', '2025-07-03 19:15:10.526'),
	('3bf4dfe7-414e-40e6-99cc-646c690b3f18', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 02:02:43.978802', '2025-07-05 02:02:43.978802', '2025-07-04 02:02:50.834'),
	('91aa5efd-fe50-4567-9ecc-a339ca4182db', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 19:04:30.716101', '2025-07-04 19:04:30.716101', '2025-07-03 19:04:50.784'),
	('026848f0-6020-45cf-a9f6-b2aaa5d505d7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:58:01.633445', '2025-07-05 01:58:01.633445', '2025-07-04 01:58:31.396'),
	('d377f7e2-b2f2-4b2a-bc64-7e8a5901832e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 19:07:37.186486', '2025-07-04 19:07:37.186486', '2025-07-03 19:07:45.622'),
	('8353f12e-06aa-40f0-ae99-26ede98b0022', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 19:18:32.433936', '2025-07-04 19:18:32.433936', '2025-07-03 19:19:02.15'),
	('c15fb1b0-8e51-4de4-8ab4-324c138c47e5', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:28:34.683851', '2025-07-05 01:28:34.683851', '2025-07-04 01:29:06.038'),
	('b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-03 19:08:17.648683', '2025-07-04 19:08:17.648683', '2025-07-03 19:08:27.939'),
	('187c44c1-cd18-4cd4-b6dc-24b506b109c9', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:58:39.423171', '2025-07-05 01:58:39.423171', '2025-07-04 01:58:52.154'),
	('ad83cb08-4489-4fed-b7f4-bab3050c2e62', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:17:11.861512', '2025-07-05 01:17:11.861512', '2025-07-04 01:17:52.812'),
	('7ef9dcfe-4064-4796-96df-44a2fe281993', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 06:59:49.154533', '2025-07-05 06:59:49.154533', '2025-07-04 06:59:54.294'),
	('fa10aaa4-7db0-4aaf-b0ae-9f08eb50f271', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 11:08:26.346824', '2025-07-05 11:08:26.346824', '2025-07-04 11:08:26.346824'),
	('86d54824-4f75-48dd-a05a-811fef7d8171', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 16:03:32.922429', '2025-07-05 16:03:32.922429', '2025-07-04 16:03:32.922429'),
	('4c83b9fa-e2cf-4705-b797-4cae7c69638f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 01:30:50.281275', '2025-07-05 01:30:50.281275', '2025-07-04 01:31:20.48'),
	('f81cf7f0-5217-48df-b047-1494ebe8525b', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 16:38:46.394069', '2025-07-05 16:38:46.394069', '2025-07-04 16:38:46.394069'),
	('78b06304-fa57-488e-bb9f-8bed1b305356', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 02:02:10.258659', '2025-07-05 02:02:10.258659', '2025-07-04 02:02:23.885'),
	('8b1c08b6-58de-4124-a575-75006af30ff1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-04 02:02:59.905052', '2025-07-05 02:02:59.905052', '2025-07-04 02:03:17.678'),
	('2372fb5a-b9b0-4965-92d3-f4d482fbbc45', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:02:35.879184', '2025-07-06 02:02:35.879184', '2025-07-05 02:03:16.235'),
	('451548e2-c9aa-4911-8512-3ca548b9a0fc', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 01:49:23.283532', '2025-07-06 01:49:23.283532', '2025-07-05 01:49:38.604'),
	('623b064b-f530-4d58-b68c-21168eae0a0e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:03:41.854146', '2025-07-06 02:03:41.854146', '2025-07-05 02:04:14.899'),
	('95dea75a-b93a-45eb-a62e-8f3855e2fcef', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:04:46.585668', '2025-07-06 02:04:46.585668', '2025-07-05 02:04:46.585668'),
	('f24245af-c431-440b-a8cb-7373751e97ca', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:06:01.227782', '2025-07-06 02:06:01.227782', '2025-07-05 02:06:01.227782'),
	('14a13f36-a7cf-4610-ade7-e63fac0b9f71', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:25:03.417652', '2025-07-06 02:25:03.417652', '2025-07-05 02:25:31.498'),
	('51a4788f-64f0-42ad-b04e-cb043c83e1c0', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '::1', 'CN', 'zh-CN', '2025-07-06 02:12:23.69597', '2025-07-07 02:12:23.69597', '2025-07-06 02:13:30.23'),
	('ec3d45f6-d3f2-411e-990d-b4340eaf6aee', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 04:15:32.99191', '2025-07-09 04:15:32.99191', '2025-07-08 04:15:45.174'),
	('2c80a681-5cba-4ad3-a255-defaf39caf99', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 02:27:36.895395', '2025-07-06 02:27:36.895395', '2025-07-05 02:27:54.723'),
	('d8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-06 01:44:21.92396', '2025-07-07 01:44:21.92396', '2025-07-06 01:44:32.288'),
	('8219f706-763c-4b9e-a7a3-ba743f25703a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 07:37:59.42788', '2025-07-06 07:37:59.42788', '2025-07-05 07:38:50.58'),
	('e1fc4bf3-644c-42df-8ad7-6c73a47b268a', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-07 15:48:16.84313', '2025-07-08 15:48:16.84313', '2025-07-07 15:48:38.68'),
	('b3d1676d-0f44-4b5c-903d-1b171238a0cb', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 08:18:34.894538', '2025-07-06 08:18:34.894538', '2025-07-05 08:20:34.823'),
	('ba600202-8dbf-4237-bd98-928f85decaf2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 10:51:28.842237', '2025-07-06 10:51:28.842237', '2025-07-05 10:51:28.842237'),
	('894681ea-c50b-4e01-93db-ae0d4f7b7bc7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 14:19:20.809398', '2025-07-09 14:19:20.809398', '2025-07-08 14:19:58.793'),
	('1eeb9139-3ec3-45e9-bd46-8206f685022d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 10:52:21.765246', '2025-07-06 10:52:21.765246', '2025-07-05 10:53:06.54'),
	('04740ac3-0abf-4071-ac36-6765a1991cde', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-06 01:45:33.443436', '2025-07-07 01:45:33.443436', '2025-07-06 01:49:59.974'),
	('2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-07 15:51:02.116915', '2025-07-08 15:51:02.116915', '2025-07-07 15:52:49.58'),
	('92794b97-48d8-4e1d-a593-e6d90a57447c', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 12:45:17.673194', '2025-07-06 12:45:17.673194', '2025-07-05 12:45:31.655'),
	('25609051-0a90-4cc2-8eb6-59305378146d', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 04:08:33.411255', '2025-07-09 04:08:33.411255', '2025-07-08 04:08:33.411255'),
	('bf971585-2b20-47d7-9aab-4598053e4069', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-06 01:51:32.862652', '2025-07-07 01:51:32.862652', '2025-07-06 01:51:42.444'),
	('6aac8d6b-a4da-414b-998d-9a57cb4cb755', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 13:56:38.770535', '2025-07-06 13:56:38.770535', '2025-07-05 13:56:47.65'),
	('4dff613c-197c-4acf-ada9-5ba63baa6369', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 14:03:49.078702', '2025-07-06 14:03:49.078702', '2025-07-05 14:03:49.078702'),
	('21b136a8-8eb8-4532-8816-b6a59cacb9e2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-05 14:10:24.987047', '2025-07-06 14:10:24.987047', '2025-07-05 14:10:24.987047'),
	('59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 05:01:50.678739', '2025-07-09 05:01:50.678739', '2025-07-08 05:02:47.791'),
	('0ed1288d-605c-4126-a20f-20d1b89cec0f', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 04:13:35.051907', '2025-07-09 04:13:35.051907', '2025-07-08 04:14:04.201'),
	('ef26f628-e200-43a7-8df4-9b50aa806cd7', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', '::1', 'CN', 'zh-CN', '2025-07-08 08:38:31.384296', '2025-07-09 08:38:31.384296', '2025-07-08 08:38:42.694');


--
-- Data for Name: package_recommendations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."package_recommendations" ("id", "session_id", "package_id", "match_score", "rank_order", "created_at") VALUES
	('31e21f12-2fa0-4870-bfc7-0fefa22ef41c', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 83.00, 1, '2025-07-03 07:10:48.880973'),
	('4b0d350f-8143-4a30-9242-e5497c829746', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', '065cbccf-b7fe-4835-95ab-34112723be29', 83.00, 2, '2025-07-03 07:10:48.880973'),
	('d6f5dd11-15fa-41b4-9c8a-4840083ef008', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 47.00, 3, '2025-07-03 07:10:48.880973'),
	('807ecd6f-a4a2-4a00-b7bf-8fa075839883', '218e462b-f77d-4662-841f-07b7eb06e02c', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 0.00, 1, '2025-07-03 15:51:45.670324'),
	('5ef26015-1a18-48ba-a583-ddc48617f1a7', '218e462b-f77d-4662-841f-07b7eb06e02c', '065cbccf-b7fe-4835-95ab-34112723be29', 0.00, 2, '2025-07-03 15:51:45.670324'),
	('3337ff77-af8a-4b51-ae12-13eb518849ab', '81c10069-35bd-460d-a61e-9ef005fd7a40', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-03 18:59:32.426205'),
	('a21fa373-e5ff-4a21-9aaf-7c5cc2051606', '81c10069-35bd-460d-a61e-9ef005fd7a40', '065cbccf-b7fe-4835-95ab-34112723be29', 75.00, 2, '2025-07-03 18:59:32.426205'),
	('eba76907-0b57-4729-bb95-0a20b1409a9e', '81c10069-35bd-460d-a61e-9ef005fd7a40', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 55.00, 3, '2025-07-03 18:59:32.426205'),
	('dcc552df-1e00-4e07-b0e3-52acad9b4457', '91aa5efd-fe50-4567-9ecc-a339ca4182db', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', 100.00, 1, '2025-07-03 19:04:50.828465'),
	('977005d1-31a0-4e32-bb27-6f6e84a6c006', '91aa5efd-fe50-4567-9ecc-a339ca4182db', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-03 19:04:50.828465'),
	('7d2e5d60-aaba-4a2a-932d-da3cfcf727a0', 'd377f7e2-b2f2-4b2a-bc64-7e8a5901832e', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 100.00, 1, '2025-07-03 19:07:45.668006'),
	('7dabeb81-4a65-405b-a26c-8190e9aeb25a', 'd377f7e2-b2f2-4b2a-bc64-7e8a5901832e', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-03 19:07:45.668006'),
	('e0543d1a-5579-403a-84c1-87c6f421050a', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-03 19:08:27.986477'),
	('6ca05b0d-7b6c-434f-99ac-98bc25eefce1', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', '065cbccf-b7fe-4835-95ab-34112723be29', 80.00, 2, '2025-07-03 19:08:27.986477'),
	('22c151b8-2a90-4714-b933-aa2d11bdc377', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 80.00, 3, '2025-07-03 19:08:27.986477'),
	('95a9d4b3-23ad-418e-8fa9-d5691468ee99', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-03 19:12:27.679895'),
	('2359742a-86e8-4cce-afdc-64c432ff02e2', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-03 19:12:27.679895'),
	('2b3687d9-b3bd-4215-b8ef-d96c2764d74b', '8353f12e-06aa-40f0-ae99-26ede98b0022', 'f4c11b4e-6f9e-43c9-b44f-eec103e3742a', 100.00, 1, '2025-07-03 19:18:42.417475'),
	('ff8cd125-c38e-4caf-b122-a4f8e2cb09b8', '8353f12e-06aa-40f0-ae99-26ede98b0022', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-03 19:18:42.417475'),
	('13132135-41ba-4224-b738-c1a623ca37fb', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 50.00, 1, '2025-07-04 01:17:25.723165'),
	('8ed3c02f-3ad9-4a9f-8910-b0ccd98f6839', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', '065cbccf-b7fe-4835-95ab-34112723be29', 80.00, 2, '2025-07-04 01:17:25.723165'),
	('6ce6a909-386b-486c-a666-fde6b5d7f655', '39d71569-c137-41be-805f-5c2d18133252', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-04 01:19:30.769713'),
	('58e1152b-ac64-4231-8da0-116a9ee71293', '39d71569-c137-41be-805f-5c2d18133252', '065cbccf-b7fe-4835-95ab-34112723be29', 80.00, 2, '2025-07-04 01:19:30.769713'),
	('2e7f3097-ca96-4437-9801-a95eee559c71', '39d71569-c137-41be-805f-5c2d18133252', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 80.00, 3, '2025-07-04 01:19:30.769713'),
	('58c937c9-0423-442c-aaaa-c32625860da0', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', '3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', 50.00, 1, '2025-07-04 01:28:47.100946'),
	('cb049462-71aa-4536-9bfe-0392281838c0', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 50.00, 2, '2025-07-04 01:28:47.100946'),
	('d0e70f8e-5f80-401f-a7cf-160b312e1e7d', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', '2adf4189-918e-4269-a14d-42c9de88c6a7', 50.00, 3, '2025-07-04 01:28:47.100946'),
	('ee33693b-0311-42b3-9029-54ea185e7fc5', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', '1e994bd2-37d3-434c-b40e-7a01748a1070', 50.00, 1, '2025-07-04 01:30:59.992112'),
	('3f6c4076-d8e0-49c4-be0e-7d2fc6a9bada', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 100.00, 2, '2025-07-04 01:30:59.992112'),
	('99bc21d6-1da3-4421-869c-6f38a0e48ad7', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-04 01:58:15.992'),
	('ef10871a-ac2b-4cf4-88cc-6fe39404cb41', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', '065cbccf-b7fe-4835-95ab-34112723be29', 100.00, 2, '2025-07-04 01:58:15.992'),
	('915d7dea-352e-4a4a-98b8-477c1dda299c', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 80.00, 3, '2025-07-04 01:58:15.992'),
	('dd790b08-1dda-45ce-b110-13454444bf6b', '78b06304-fa57-488e-bb9f-8bed1b305356', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 100.00, 1, '2025-07-04 02:02:23.843821'),
	('cfb0e3f8-64f6-4934-b751-f90abc8cdb0c', '78b06304-fa57-488e-bb9f-8bed1b305356', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-04 02:02:23.843821'),
	('2a2c8398-0b2c-4fa4-93c6-f091c2e5388f', '3bf4dfe7-414e-40e6-99cc-646c690b3f18', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', 70.00, 1, '2025-07-04 02:02:50.799161'),
	('d4fcd352-3934-4157-be04-2ce92b1a3bff', '3bf4dfe7-414e-40e6-99cc-646c690b3f18', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 50.00, 2, '2025-07-04 02:02:50.799161'),
	('105129d6-57a7-41ac-a9b9-9ab612f0b343', '8b1c08b6-58de-4124-a575-75006af30ff1', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 50.00, 1, '2025-07-04 02:03:17.640586'),
	('f75d8ba8-c267-41e0-a047-64e1e926bb65', '8b1c08b6-58de-4124-a575-75006af30ff1', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 80.00, 2, '2025-07-04 02:03:17.640586'),
	('b704db10-eb4c-46af-a3a4-669a06075dad', '8b1c08b6-58de-4124-a575-75006af30ff1', '2adf4189-918e-4269-a14d-42c9de88c6a7', 80.00, 3, '2025-07-04 02:03:17.640586'),
	('3048d719-97d9-4c3b-ba33-9a18d9cfad9b', '451548e2-c9aa-4911-8512-3ca548b9a0fc', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-05 01:49:38.596977'),
	('68b89c11-e3c0-4dcf-b49e-3be2690caf59', '451548e2-c9aa-4911-8512-3ca548b9a0fc', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-05 01:49:38.596977'),
	('65a20c76-60b2-4064-926d-fb9567a3c4fe', '623b064b-f530-4d58-b68c-21168eae0a0e', '1e994bd2-37d3-434c-b40e-7a01748a1070', 50.00, 1, '2025-07-05 02:04:14.951872'),
	('11ef93f9-8dfe-4d47-9505-4fcfe6b21768', '623b064b-f530-4d58-b68c-21168eae0a0e', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 30.00, 2, '2025-07-05 02:04:14.951872'),
	('396bd7ea-7c21-46a8-b60b-9800a9fd2648', '14a13f36-a7cf-4610-ade7-e63fac0b9f71', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-05 02:25:31.535769'),
	('ea3c71c7-be62-4148-8e5a-c04aab58c9b4', '14a13f36-a7cf-4610-ade7-e63fac0b9f71', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-05 02:25:31.535769'),
	('82071fc3-e1b3-476a-bb08-f0105856ac44', '2c80a681-5cba-4ad3-a255-defaf39caf99', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-05 02:27:54.768155'),
	('fe43c0fa-f9bb-4133-bc51-b83e21c9b4e5', '2c80a681-5cba-4ad3-a255-defaf39caf99', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-05 02:27:54.768155'),
	('aa889537-1376-4e30-9a0a-104de2b63787', '8219f706-763c-4b9e-a7a3-ba743f25703a', 'f4c11b4e-6f9e-43c9-b44f-eec103e3742a', 50.00, 1, '2025-07-05 07:38:17.062499'),
	('63405805-0363-4621-9a69-bcff7e8b9181', '8219f706-763c-4b9e-a7a3-ba743f25703a', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-05 07:38:17.062499'),
	('324b751e-b546-4072-8f5c-02f360d159a6', '1eeb9139-3ec3-45e9-bd46-8206f685022d', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-05 10:52:43.073676'),
	('a0f972b2-8528-41d5-9196-08a01c9c2aec', '1eeb9139-3ec3-45e9-bd46-8206f685022d', '065cbccf-b7fe-4835-95ab-34112723be29', 30.00, 2, '2025-07-05 10:52:43.073676'),
	('44479727-e719-470e-aada-98725d7fb436', '92794b97-48d8-4e1d-a593-e6d90a57447c', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-05 12:45:31.691122'),
	('e1cabf16-a7df-4df2-a2ee-80d14f9ff4c9', '92794b97-48d8-4e1d-a593-e6d90a57447c', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-05 12:45:31.691122'),
	('8e376ef9-aa32-443a-960c-9c8ab344a042', '6aac8d6b-a4da-414b-998d-9a57cb4cb755', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-05 13:56:47.692432'),
	('ad164c88-28af-4295-8faa-900200382ba4', '6aac8d6b-a4da-414b-998d-9a57cb4cb755', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-05 13:56:47.692432'),
	('9d502cc4-9170-4347-bc03-59086a24bece', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 100.00, 1, '2025-07-06 01:44:32.269194'),
	('5191e19e-49bc-4b38-8951-fa6ebb0c74f8', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', '065cbccf-b7fe-4835-95ab-34112723be29', 80.00, 2, '2025-07-06 01:44:32.269194'),
	('170b566d-1c97-43fe-99c3-8acabc3097e2', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 'df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c', 80.00, 3, '2025-07-06 01:44:32.269194'),
	('a662ffb3-870e-4869-a410-1b85783cd981', '04740ac3-0abf-4071-ac36-6765a1991cde', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-06 01:49:59.952307'),
	('89fca606-1270-4096-942e-bccab022874d', '04740ac3-0abf-4071-ac36-6765a1991cde', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 100.00, 2, '2025-07-06 01:49:59.952307'),
	('5a1d96c6-36cc-4b3a-96bb-bcec6a921bac', 'bf971585-2b20-47d7-9aab-4598053e4069', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 100.00, 1, '2025-07-06 01:51:42.441181'),
	('da86be37-01f8-492c-a24a-1a95e299c2c5', 'bf971585-2b20-47d7-9aab-4598053e4069', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-06 01:51:42.441181'),
	('690e21b7-6c93-4f0c-b1b3-a8f99bcaeed5', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-06 02:12:35.298642'),
	('87472d47-bcac-410e-8006-62cd796a5603', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-06 02:12:35.298642'),
	('1c74d7af-89e8-4dca-bcb5-c39e22521a2d', 'e1fc4bf3-644c-42df-8ad7-6c73a47b268a', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-07 15:48:38.659717'),
	('b9f8b78c-2e1b-421e-8dc0-8c153229ba83', 'e1fc4bf3-644c-42df-8ad7-6c73a47b268a', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-07 15:48:38.659717'),
	('2ac84a83-7208-4278-8c0e-2bff887fc647', '2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', '5ac6d04b-eb4e-43e3-a52f-385eef81551e', 70.00, 1, '2025-07-07 15:52:49.56639'),
	('a6a0c4a3-aaec-4803-bcaf-fa8026a44a0f', '2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 50.00, 2, '2025-07-07 15:52:49.56639'),
	('4451aa48-954a-4cae-8574-71e7efbf75b2', '0ed1288d-605c-4126-a20f-20d1b89cec0f', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 100.00, 1, '2025-07-08 04:14:04.065656'),
	('938dc47e-9938-451c-b367-951630f0c47a', '0ed1288d-605c-4126-a20f-20d1b89cec0f', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-08 04:14:04.065656'),
	('1af0d26d-bd75-4870-855f-66bdb15e48f3', 'ec3d45f6-d3f2-411e-990d-b4340eaf6aee', '3c5aad05-5a9f-4d24-a7fb-be2a9e3b9528', 50.00, 1, '2025-07-08 04:15:45.127881'),
	('d8b8ebc2-5e01-4c32-b2c0-995da35a8066', 'ec3d45f6-d3f2-411e-990d-b4340eaf6aee', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-08 04:15:45.127881'),
	('c6a45334-355c-49a0-9072-1f24251e913c', '59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', '2413e627-95a1-4ea5-bc99-09b0e08ee84a', 50.00, 1, '2025-07-08 05:02:47.737113'),
	('d084e2d7-f9c0-4892-bad6-fe384e86d3fc', '59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', 'f1ae5eaa-0679-4a2c-9923-2fc56b588223', 20.00, 2, '2025-07-08 05:02:47.737113'),
	('cea32f0e-4275-4e17-bc2c-8f391f6a0599', 'ef26f628-e200-43a7-8df4-9b50aa806cd7', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-08 08:38:42.903182'),
	('3fd9da1c-a54c-4955-b781-0853fd9f870e', 'ef26f628-e200-43a7-8df4-9b50aa806cd7', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-08 08:38:42.903182'),
	('87dff987-1a6b-4e4c-8264-4bae86600f1f', '894681ea-c50b-4e01-93db-ae0d4f7b7bc7', '1e994bd2-37d3-434c-b40e-7a01748a1070', 100.00, 1, '2025-07-08 14:19:59.06963'),
	('5f9f4d24-9ff7-4b9c-9fd3-5e25c36c6589', '894681ea-c50b-4e01-93db-ae0d4f7b7bc7', 'c57c39d9-85ff-45ae-9c85-62a257b06913', 80.00, 2, '2025-07-08 14:19:59.06963');


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."quotes" ("id", "quote_id", "session_id", "packages", "personal_info", "total_price", "currency", "created_at", "expires_at") VALUES
	('c261fcfb-6386-4a91-bd3e-081a5c86ad8c', 'Q2507039184', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "065cbccf-b7fe-4835-95ab-34112723be29", "name_cn": "一日V脸大师套餐", "name_ko": "원데이 V라인 마스터", "price_tier": "premium", "category_id": "elasticity", "final_price": 1503810, "package_code": "ELASTICITY_PREMIUM"}]', '{"name": "김테스트", "visit_date": "2025-07-15"}', 1943370, 'KRW', '2025-07-03 07:40:09.844', '2025-07-10 07:40:09.844'),
	('fd43401e-4089-40e4-987d-922f7c908085', 'Q2507040463', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', '[{"id": "1e994bd2-37d3-434c-b40e-7a01748a1070", "name_cn": "一日容积补充套餐", "name_ko": "원데이 볼륨 부스터", "price_tier": "basic", "category_id": "volume", "final_price": 534600, "package_code": "VOLUME_BASIC"}]', '{}', 534600, 'KRW', '2025-07-03 19:15:10.469', '2025-07-10 19:15:10.469'),
	('243593fe-8d89-43db-8808-27fcc1c1d985', 'Q2507045470', '8353f12e-06aa-40f0-ae99-26ede98b0022', '[{"id": "1e994bd2-37d3-434c-b40e-7a01748a1070", "name_cn": "一日容积补充套餐", "name_ko": "원데이 볼륨 부스터", "price_tier": "basic", "category_id": "volume", "final_price": 534600, "package_code": "VOLUME_BASIC"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 980100, 'KRW', '2025-07-03 19:19:02.12', '2025-07-10 19:19:02.12'),
	('fba8f970-c86f-4204-9be5-215fdf6f9267', 'Q2507041331', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "1e994bd2-37d3-434c-b40e-7a01748a1070", "name_cn": "一日容积补充套餐", "name_ko": "원데이 볼륨 부스터", "price_tier": "basic", "category_id": "volume", "final_price": 534600, "package_code": "VOLUME_BASIC"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 1419660, 'KRW', '2025-07-04 01:17:52.764', '2025-07-11 01:17:52.764'),
	('19913279-407d-4e90-af21-acbb52204877', 'Q2507047348', '39d71569-c137-41be-805f-5c2d18133252', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c", "name_cn": "一日全面提升套餐", "name_ko": "원데이 토탈 리프팅", "price_tier": "luxury", "category_id": "elasticity", "final_price": 3336300, "package_code": "ELASTICITY_LUXURY"}, {"id": "1e994bd2-37d3-434c-b40e-7a01748a1070", "name_cn": "一日容积补充套餐", "name_ko": "원데이 볼륨 부스터", "price_tier": "basic", "category_id": "volume", "final_price": 534600, "package_code": "VOLUME_BASIC"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 4755960, 'KRW', '2025-07-04 01:19:48.852', '2025-07-11 01:19:48.852'),
	('b87b98f6-eb12-4be4-95e8-ee69d725e393', 'Q2507046579', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "df6b89a0-cbfa-4a5b-a8ef-a5b0f3cc326c", "name_cn": "一日全面提升套餐", "name_ko": "원데이 토탈 리프팅", "price_tier": "luxury", "category_id": "elasticity", "final_price": 3336300, "package_code": "ELASTICITY_LUXURY"}, {"id": "2adf4189-918e-4269-a14d-42c9de88c6a7", "name_cn": "一日全脸焕新套餐", "name_ko": "원데이 풀페이스 리뉴얼", "price_tier": "ultra", "category_id": "elasticity", "final_price": 6672600, "package_code": "ELASTICITY_ULTRA"}, {"id": "1e994bd2-37d3-434c-b40e-7a01748a1070", "name_cn": "一日容积补充套餐", "name_ko": "원데이 볼륨 부스터", "price_tier": "basic", "category_id": "volume", "final_price": 534600, "package_code": "VOLUME_BASIC"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 11428560, 'KRW', '2025-07-04 01:29:05.988', '2025-07-11 01:29:05.988'),
	('a5b8a285-b79b-4e23-9074-b0128e9a1cef', 'Q2507042059', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', '[{"id": "c57c39d9-85ff-45ae-9c85-62a257b06913", "name_cn": "一日童颜套餐", "name_ko": "원데이 베이비페이스", "price_tier": "premium", "category_id": "volume", "final_price": 1335510, "package_code": "VOLUME_PREMIUM"}]', '{}', 1335510, 'KRW', '2025-07-04 01:31:20.374', '2025-07-11 01:31:20.374'),
	('11701e91-1ef8-444a-a771-88fbbbf69f20', 'Q2507046543', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', '[{"id": "065cbccf-b7fe-4835-95ab-34112723be29", "name_cn": "一日V脸大师套餐", "name_ko": "원데이 V라인 마스터", "price_tier": "premium", "category_id": "elasticity", "final_price": 1503810, "package_code": "ELASTICITY_PREMIUM"}, {"id": "c57c39d9-85ff-45ae-9c85-62a257b06913", "name_cn": "一日童颜套餐", "name_ko": "원데이 베이비페이스", "price_tier": "premium", "category_id": "volume", "final_price": 1335510, "package_code": "VOLUME_PREMIUM"}]', '{}', 2839320, 'KRW', '2025-07-04 01:58:31.36', '2025-07-11 01:58:31.36'),
	('0cfae470-f166-4532-8bac-9c0f30b978e7', 'Q2507054717', '8219f706-763c-4b9e-a7a3-ba743f25703a', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "065cbccf-b7fe-4835-95ab-34112723be29", "name_cn": "一日V脸大师套餐", "name_ko": "원데이 V라인 마스터", "price_tier": "premium", "category_id": "elasticity", "final_price": 1503810, "package_code": "ELASTICITY_PREMIUM"}, {"id": "c57c39d9-85ff-45ae-9c85-62a257b06913", "name_cn": "一日童颜套餐", "name_ko": "원데이 베이비페이스", "price_tier": "premium", "category_id": "volume", "final_price": 1335510, "package_code": "VOLUME_PREMIUM"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 3724380, 'KRW', '2025-07-05 07:38:50.534', '2025-07-12 07:38:50.534'),
	('ba494da9-0ee6-4c20-8375-972484ae2d5e', 'Q2507055495', '1eeb9139-3ec3-45e9-bd46-8206f685022d', '[{"id": "f1ae5eaa-0679-4a2c-9923-2fc56b588223", "name_cn": "一日迷你提升套餐", "name_ko": "원데이 미니 리프팅", "price_tier": "basic", "category_id": "elasticity", "final_price": 439560, "package_code": "ELASTICITY_BASIC"}, {"id": "065cbccf-b7fe-4835-95ab-34112723be29", "name_cn": "一日V脸大师套餐", "name_ko": "원데이 V라인 마스터", "price_tier": "premium", "category_id": "elasticity", "final_price": 1503810, "package_code": "ELASTICITY_PREMIUM"}, {"id": "c57c39d9-85ff-45ae-9c85-62a257b06913", "name_cn": "一日童颜套餐", "name_ko": "원데이 베이비페이스", "price_tier": "premium", "category_id": "volume", "final_price": 1335510, "package_code": "VOLUME_PREMIUM"}, {"id": "f4c11b4e-6f9e-43c9-b44f-eec103e3742a", "name_cn": "一日纤体套餐", "name_ko": "원데이 바디 슬림", "price_tier": "basic", "category_id": "body", "final_price": 445500, "package_code": "BODY_BASIC"}]', '{}', 3724380, 'KRW', '2025-07-05 10:53:06.505', '2025-07-12 10:53:06.505'),
	('1efb9066-93e1-4874-9faa-fdab7260495a', 'Q2507067946', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', '[{"id": "065cbccf-b7fe-4835-95ab-34112723be29", "name_cn": "一日V脸大师套餐", "name_ko": "원데이 V라인 마스터", "price_tier": "premium", "category_id": "elasticity", "final_price": 1503810, "package_code": "ELASTICITY_PREMIUM"}]', '{}', 1503810, 'KRW', '2025-07-06 02:13:30.182', '2025-07-13 02:13:30.182');


--
-- Data for Name: treatment_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."treatment_info" ("id", "treatment_code", "category_ko", "category_cn", "simple_desc_ko", "simple_desc_cn", "icon_type", "created_at", "updated_at") VALUES
	('83b7117c-8e31-4d26-8c1c-6673ca1a9800', 'LIFTERA_1000', '리프팅', '提升', 'HIFU 초음파로 피부 탄력층을 자극하여 자연스러운 리프팅 효과', 'HIFU超声波刺激皮肤弹性层，实现自然提升效果', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('4ec65832-93f7-4162-9bce-33b26ce0da8d', 'THREAD_LIFT_4', '리프팅', '提升', '녹는 실로 처진 피부를 당겨 올려 즉각적인 V라인 효과', '使用可溶解线材拉提下垂皮肤，立即呈现V脸效果', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('fe377ec6-2b43-4dfe-8ba8-5b0b260d0734', 'THREAD_LIFT_6', '리프팅', '提升', '6줄의 실로 더욱 강력한 리프팅과 탄력 개선 효과', '6根线材实现更强力的提升和弹性改善效果', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('cebdcb10-a156-4875-acd6-d3b701db4e8d', 'ULTHERA_300', '리프팅', '提升', '초음파로 SMAS층까지 자극하여 강력한 리프팅 효과', '超声波刺激至SMAS层，实现强力提升效果', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('739bdd7c-0adf-42fe-9890-cea2e4d21731', 'ULTHERA_600', '리프팅', '提升', '고강도 초음파로 얼굴 전체의 탄력과 리프팅 개선', '高强度超声波改善全脸弹性和提升', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('6dd46fb0-c517-44b4-88df-da082c9ef0cd', 'ULTHERA_1000', '리프팅', '提升', '1000샷의 초음파로 얼굴과 목까지 전체적인 리프팅', '1000发超声波实现脸部到颈部的全面提升', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('527e2b69-d99e-4aac-bfe5-1a4be0346e2d', 'THERMAGE_600', '탄력', '弹性', '고주파로 콜라겐 재생을 촉진하여 탄탄한 피부 탄력', '高频促进胶原再生，实现紧致皮肤弹性', 'elasticity', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('8f46eafd-e00d-42f4-82cc-56760206f8a6', 'LINEAR_300', '리프팅', '提升', '선형 초음파로 이중턱과 턱선을 개선하는 집중 리프팅', '线性超声波集中改善双下巴和下颌线', 'lifting', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('d3ec5c2c-dd7b-4bf7-9266-9fa3c9746bb6', 'INMODE_FACE', '탄력', '弹性', '고주파와 적외선으로 피부 탄력과 윤곽을 동시 개선', '高频和红外线同时改善皮肤弹性和轮廓', 'elasticity', '2025-07-05 13:33:12.976232+00', '2025-07-05 13:33:12.976232+00'),
	('bf5b2c07-5988-4194-b428-83a9eaa1ba60', 'BOTOX_UPPER_KR', '주름개선', '除皱', '이마와 눈가 표정주름을 부드럽게 완화하는 보톡스', '温和缓解额头和眼部表情纹的肉毒素', 'wrinkle', '2025-07-05 13:33:26.517162+00', '2025-07-05 13:33:26.517162+00'),
	('29e992d7-863d-4009-bce0-5ad12a5e698f', 'BOTOX_SKIN_KR', '피부결', '肤质', '얼굴 전체에 미세하게 주입하여 매끈하고 탱탱한 피부결', '全脸微量注射，打造光滑紧致的肤质', 'hydration', '2025-07-05 13:33:26.517162+00', '2025-07-05 13:33:26.517162+00'),
	('3edbdd65-0774-4fe1-bf53-bdebeb5b72e3', 'BOTOX_JAW_ZEOMIN', '리프팅', '提升', '발달된 턱 근육을 축소시켜 갸름한 V라인 얼굴', '缩小发达的咬肌，打造纤细V脸', 'lifting', '2025-07-05 13:33:26.517162+00', '2025-07-05 13:33:26.517162+00'),
	('b095379e-f386-43a6-9715-3d26291fe4d9', 'BOTOX_UPPER_ALLERGAN', '주름개선', '除皱', '프리미엄 보톡스로 자연스럽고 오래 지속되는 주름 개선', '高端肉毒素实现自然持久的除皱效果', 'wrinkle', '2025-07-05 13:33:26.517162+00', '2025-07-05 13:33:26.517162+00'),
	('091514aa-35fc-45a5-bda7-a3822dd844c1', 'REJURAN_2CC', '수분/재생', '补水/再生', 'DNA 성분으로 피부 재생과 탄력을 동시에 개선', 'DNA成分同时改善皮肤再生和弹性', 'hydration', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('c4ffdaaa-e717-46fc-b9a5-33e188dd3091', 'REJURAN_EYE', '주름개선', '除皱', '눈가 전용 리쥬란으로 잔주름과 다크서클 개선', '眼部专用丽珠兰改善细纹和黑眼圈', 'wrinkle', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('1b95db4e-ee99-4937-aa37-72ce9c6d2307', 'FILLER_CHEEK_3CC', '볼륨', '容量', '자연스러운 볼륨감으로 동안 얼굴을 완성하는 필러', '自然的容量感打造童颜效果的填充剂', 'volume', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('63ca699a-9f36-4786-8654-c1da2f7d3071', 'FILLER_TEMPLE_3CC', '볼륨', '容量', '꺼진 이마와 관자놀이를 채워 입체적인 얼굴', '填充凹陷的额头和太阳穴，打造立体面部', 'volume', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('a0be6fb6-c01e-422c-812a-ca1822348834', 'FILLER_10CC', '볼륨', '容量', '얼굴 전체 볼륨을 디자인하는 프리미엄 필러', '设计全脸容量的高端填充剂', 'volume', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('f61b4c3b-481f-4ae6-8d8c-3d9f7746b668', 'WATER_SHINE', '수분/광채', '补水/光泽', '히알루론산을 직접 주입하여 촉촉하고 빛나는 피부', '直接注入玻尿酸，打造水润有光泽的皮肤', 'hydration', '2025-07-05 13:33:42.373287+00', '2025-07-05 13:33:42.373287+00'),
	('da33eb1e-e6f1-4a09-a460-ca42b50595a5', 'PICO_FRAXEL', '피부결', '肤质', '피코 레이저로 모공과 흉터를 개선하고 매끈한 피부결', '皮秒激光改善毛孔和疤痕，打造光滑肤质', 'pigment', '2025-07-05 13:33:55.453194+00', '2025-07-05 13:33:55.453194+00'),
	('ecf22f93-a832-4236-be9d-80687220931e', 'PICO_TONING', '색소', '色素', '멜라닌 색소를 파괴하여 맑고 깨끗한 피부톤', '破坏黑色素，实现清透明亮的肤色', 'pigment', '2025-07-05 13:33:55.453194+00', '2025-07-05 13:33:55.453194+00'),
	('852ae3cc-50b0-44a5-9845-50233efd888a', 'DUAL_TONING', '색소', '色素', '듀얼 파장으로 잡티와 칙칙함을 동시에 개선', '双波长同时改善色斑和暗沉', 'pigment', '2025-07-05 13:33:55.453194+00', '2025-07-05 13:33:55.453194+00'),
	('b25682eb-22aa-49d5-953f-949b27d779fb', 'AQUA_PEEL_5', '피부결', '肤质', '5단계 관리로 각질과 노폐물을 제거하고 촉촉한 피부', '5步管理去除角质和废物，打造水润皮肤', 'hydration', '2025-07-05 13:33:55.453194+00', '2025-07-05 13:33:55.453194+00'),
	('dc12dfbd-83ed-41a4-8575-df58ecaaa4a7', 'LDM_CARE', '수분/진정', '补水/镇静', '초음파로 유효성분을 깊숙이 전달하여 피부 진정과 재생', '超声波深层传递有效成分，镇静和再生皮肤', 'hydration', '2025-07-05 13:33:55.453194+00', '2025-07-05 13:33:55.453194+00'),
	('e52d6052-2b08-43cc-90a3-f9198d47594a', 'BODY_INMODE', '바디', '身体', '고주파로 지방 분해와 탄력을 동시에 개선하는 바디 관리', '高频同时改善脂肪分解和弹性的身体管理', 'body', '2025-07-05 13:34:06.766753+00', '2025-07-05 13:34:06.766753+00'),
	('68b2c14f-7151-4ab5-90c6-9f2c0092b831', 'BODY_INMODE_5', '바디', '身体', '5회 패키지로 확실한 바디라인 개선 효과', '5次套餐实现明显的身体线条改善效果', 'body', '2025-07-05 13:34:06.766753+00', '2025-07-05 13:34:06.766753+00'),
	('c1b8a046-5627-4b6f-97c3-98138571c178', 'S_SLIM_10', '바디', '身体', '지방 분해 주사로 부분 비만을 집중적으로 개선', '脂肪分解注射集中改善局部肥胖', 'body', '2025-07-05 13:34:06.766753+00', '2025-07-05 13:34:06.766753+00'),
	('35824498-0501-426f-9d0c-c8bf8d565d4b', 'LINEAR_BODY_1000', '바디', '身体', '선형 초음파로 바디 전체의 탄력과 라인을 개선', '线性超声波改善全身弹性和线条', 'body', '2025-07-05 13:34:06.766753+00', '2025-07-05 13:34:06.766753+00');


--
-- Data for Name: user_inputs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_inputs" ("id", "session_id", "step_number", "selected_concerns", "created_at") VALUES
	('bc3d79bd-fce3-4482-8367-d40773c84f20', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', 1, '["elasticity", "volume"]', '2025-07-03 07:09:29.053929'),
	('ec38cabb-c544-44da-a2e9-2d48d1057e6c', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', 2, '["cheek_jaw_sagging", "double_chin", "cheek_hollowing"]', '2025-07-03 07:09:46.812217'),
	('157dd6dc-2ecc-4fc6-a780-d80f9b6dcd78', 'b56ba9f1-407a-49d7-a6e1-2f203af99780', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-03 07:10:03.637945'),
	('318d91c7-76a0-4b3a-9f82-79bf0601448c', '218e462b-f77d-4662-841f-07b7eb06e02c', 3, '["cheek_jaw_sagging"]', '2025-07-03 15:51:35.79894'),
	('4ad80335-d59c-4d7f-be45-8bd4d8512c0e', 'c8bce416-0625-47f5-9cdb-0b2fa11f925f', 1, '["volume"]', '2025-07-03 18:56:26.287521'),
	('d69092f7-d780-405e-adff-206ed33f7471', '9785633e-df7d-4a35-8e87-229c26281612', 1, '["elasticity"]', '2025-07-03 18:57:08.269436'),
	('0f251b10-e58e-415f-bc76-376310305767', '14448b1c-3ace-4099-ad36-d5837894ac59', 1, '["body"]', '2025-07-03 18:57:18.63527'),
	('0504fd16-908e-4043-a985-399d7a41d252', '81c10069-35bd-460d-a61e-9ef005fd7a40', 1, '["elasticity"]', '2025-07-03 18:59:10.139115'),
	('5a280e58-e64d-452c-b16f-9339e2e0ff61', '81c10069-35bd-460d-a61e-9ef005fd7a40', 2, '["fine_lines_early", "cheek_jaw_sagging"]', '2025-07-03 18:59:24.265769'),
	('cb295fb9-43a1-4750-b5e4-912d6bdbaf28', '81c10069-35bd-460d-a61e-9ef005fd7a40', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-03 18:59:31.030384'),
	('bcd2f244-d17c-4c03-97b8-a9c564327281', 'd4252335-8095-464d-9d5a-20d10eade31b', 1, '["volume"]', '2025-07-03 18:59:47.86113'),
	('b8d1e018-db16-40dc-89c4-cc391ae0132e', '91aa5efd-fe50-4567-9ecc-a339ca4182db', 1, '["pigmentation"]', '2025-07-03 19:04:34.869149'),
	('0baff324-5e45-4603-aaae-acbba78f880b', '91aa5efd-fe50-4567-9ecc-a339ca4182db', 2, '["melasma_freckles"]', '2025-07-03 19:04:42.696048'),
	('02bb0e16-541c-470d-9bcd-d73f38782512', '91aa5efd-fe50-4567-9ecc-a339ca4182db', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-03 19:04:49.421548'),
	('e811d84c-b60b-4eb5-bde7-3c74bee002f0', 'd377f7e2-b2f2-4b2a-bc64-7e8a5901832e', 1, '["skin_texture"]', '2025-07-03 19:07:39.185538'),
	('5056c3ef-060b-49ce-93f6-8a88c47fcfb4', 'd377f7e2-b2f2-4b2a-bc64-7e8a5901832e', 2, '["rough_texture"]', '2025-07-03 19:07:42.131981'),
	('92dc6f6c-6f14-46ad-b086-66e5451da9c6', 'd377f7e2-b2f2-4b2a-bc64-7e8a5901832e', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-03 19:07:44.476806'),
	('09507cec-2bc2-47ce-9408-796bbc458c6e', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 1, '["elasticity"]', '2025-07-03 19:08:20.165661'),
	('a280fc46-891d-4fa2-adfd-6bd9da293e86', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 2, '["cheek_jaw_sagging"]', '2025-07-03 19:08:23.442031'),
	('a3ff5c50-c5cd-48b3-aa30-c765270ac672', 'b2bc95a5-fd95-4d7e-a94c-3ddff3abb614', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-03 19:08:26.94269'),
	('0e1a5fb5-2b00-4f05-a993-81ba5bf23fbc', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', 1, '["volume"]', '2025-07-03 19:12:21.269041'),
	('b099bd1c-6b6e-42b4-8fd2-960840ec106c', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', 2, '["cheek_hollowing"]', '2025-07-03 19:12:23.804656'),
	('539a219b-83be-4e5b-bb6c-ae454e61a9f9', '7cf390a4-d6a6-45c1-ae48-e6f823044f7f', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-03 19:12:26.580484'),
	('f6c5e8f1-3b06-41c3-8ab0-5e10d886c680', '8353f12e-06aa-40f0-ae99-26ede98b0022', 1, '["body"]', '2025-07-03 19:18:34.601987'),
	('a76ae425-dd73-423b-8c0c-e2e39baac261', '8353f12e-06aa-40f0-ae99-26ede98b0022', 2, '["cellulite"]', '2025-07-03 19:18:38.036608'),
	('c0592a60-398f-488b-a21a-039d50ed6d75', '8353f12e-06aa-40f0-ae99-26ede98b0022', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-03 19:18:41.227568'),
	('408098a5-f434-40f9-ab52-24604dbd497f', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', 1, '["elasticity"]', '2025-07-04 01:17:16.867247'),
	('d3866153-7806-492b-a36d-29dbfec70e2b', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', 2, '["subcutaneous_fat_sagging"]', '2025-07-04 01:17:21.207679'),
	('41e33e2f-c7b9-4223-ab70-b4c98305bf7c', 'ad83cb08-4489-4fed-b7f4-bab3050c2e62', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-04 01:17:24.277768'),
	('fba3f219-051a-47a0-a395-86a470376df1', '39d71569-c137-41be-805f-5c2d18133252', 1, '["elasticity"]', '2025-07-04 01:19:22.953307'),
	('56ca2d2b-cdaa-40fa-b4ad-6551bb66fddc', '39d71569-c137-41be-805f-5c2d18133252', 2, '["cheek_jaw_sagging"]', '2025-07-04 01:19:26.012237'),
	('f1031fdc-4b3e-42f1-895d-ad75ac04c6a3', '39d71569-c137-41be-805f-5c2d18133252', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-04 01:19:29.440908'),
	('b6fe59ab-731b-4fdf-83f4-e16c21bf0756', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', 1, '["wrinkles"]', '2025-07-04 01:28:38.782319'),
	('26ebc247-cb2b-4dfd-aa0a-b71e35a5b50d', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', 2, '["deep_wrinkles"]', '2025-07-04 01:28:42.027719'),
	('033c1504-d9a5-4121-9232-ed801a0ebaaa', 'c15fb1b0-8e51-4de4-8ab4-324c138c47e5', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-04 01:28:45.815292'),
	('c5815756-d6b6-4b1f-a51d-abffa89f2c8a', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', 1, '["volume"]', '2025-07-04 01:30:53.861203'),
	('373f8300-9ba9-4c24-adff-1d3f5f727c37', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', 2, '["temple_hollowing"]', '2025-07-04 01:30:56.690392'),
	('880fcd2c-c5db-495b-93ae-53fe19df0db4', '4c83b9fa-e2cf-4705-b797-4cae7c69638f', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-04 01:30:58.793096'),
	('cd25b04d-f809-43ec-b401-e4ea05867752', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', 1, '["elasticity"]', '2025-07-04 01:58:08.134591'),
	('a1f26cbc-d25d-49b2-916d-508a9302ee0f', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', 2, '["cheek_jaw_sagging"]', '2025-07-04 01:58:10.722812'),
	('2f843514-79d9-46e4-b386-f2545e183210', '026848f0-6020-45cf-a9f6-b2aaa5d505d7', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-04 01:58:14.604587'),
	('0812afdd-9493-42bf-8b75-6066a7886168', '187c44c1-cd18-4cd4-b6dc-24b506b109c9', 1, '["volume"]', '2025-07-04 01:58:42.633219'),
	('dd2c80a7-721f-4d9a-ac3d-e920ab3d837c', '187c44c1-cd18-4cd4-b6dc-24b506b109c9', 2, '["body_volume_loss"]', '2025-07-04 01:58:52.120218'),
	('0e015716-c393-4c0c-b40c-275ed2ed4c91', '78b06304-fa57-488e-bb9f-8bed1b305356', 1, '["skin_texture"]', '2025-07-04 02:02:13.496926'),
	('35e5a155-1cea-4f39-8119-2c9872438fe9', '78b06304-fa57-488e-bb9f-8bed1b305356', 2, '["rough_texture"]', '2025-07-04 02:02:16.020665'),
	('10f68afb-59ea-4694-96ed-34bac4ae1dc4', '78b06304-fa57-488e-bb9f-8bed1b305356', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-04 02:02:22.610101'),
	('0f526da3-886c-4136-8831-9ccf73497fb2', '3bf4dfe7-414e-40e6-99cc-646c690b3f18', 1, '["skin_texture"]', '2025-07-04 02:02:45.778616'),
	('7c6c5f4d-8d5b-44a6-808b-6e95763c59bd', '3bf4dfe7-414e-40e6-99cc-646c690b3f18', 2, '["dull_uneven_tone"]', '2025-07-04 02:02:47.694625'),
	('3a7b50c6-4661-4f54-a577-e2a88e4517e0', '3bf4dfe7-414e-40e6-99cc-646c690b3f18', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-04 02:02:49.666989'),
	('39ff3420-aaed-49e4-aba8-2498844c55ba', '8b1c08b6-58de-4124-a575-75006af30ff1', 1, '["elasticity"]', '2025-07-04 02:03:10.887187'),
	('091d07d6-ea57-44df-ab86-53e176938cd3', '8b1c08b6-58de-4124-a575-75006af30ff1', 2, '["neck_sagging"]', '2025-07-04 02:03:13.286934'),
	('f64a9006-79a9-4ed4-9fd9-348c33072e26', '8b1c08b6-58de-4124-a575-75006af30ff1', 3, '{"budget_range": "standard", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-04 02:03:16.539306'),
	('50b4b84f-121b-4ba4-a55e-4e875e88f826', 'cc9ce36b-5d0e-446d-89cf-9d61e31b579a', 1, '["volume"]', '2025-07-04 06:37:12.750179'),
	('3fd786f0-879a-4da4-aa40-70d54973a20a', '7ef9dcfe-4064-4796-96df-44a2fe281993', 1, '["volume"]', '2025-07-04 06:59:54.35276'),
	('d0920f2f-e6f2-4caf-9603-a820e91a9cf4', '451548e2-c9aa-4911-8512-3ca548b9a0fc', 1, '["volume"]', '2025-07-05 01:49:30.937067'),
	('d61d63ec-580b-409b-b7c9-50f7c151c0d3', '451548e2-c9aa-4911-8512-3ca548b9a0fc', 2, '["cheek_hollowing"]', '2025-07-05 01:49:33.718341'),
	('b0426d16-9022-4872-8219-161a9772e4e4', '451548e2-c9aa-4911-8512-3ca548b9a0fc', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-05 01:49:36.98895'),
	('716dea39-7b36-4d1f-bbfd-3cf4acbdfca1', '2372fb5a-b9b0-4965-92d3-f4d482fbbc45', 1, '["volume"]', '2025-07-05 02:03:10.857721'),
	('04aa174a-693d-405c-9175-5385efb76e8a', '2372fb5a-b9b0-4965-92d3-f4d482fbbc45', 2, '["lip_volume_loss"]', '2025-07-05 02:03:16.291402'),
	('9b0f7010-4ed3-47ca-99a3-e0ee1f948a56', '623b064b-f530-4d58-b68c-21168eae0a0e', 1, '["volume"]', '2025-07-05 02:03:57.525855'),
	('d43a3584-1d7f-46ae-8656-23dbaaf04035', '623b064b-f530-4d58-b68c-21168eae0a0e', 2, '["body_volume_loss"]', '2025-07-05 02:04:01.551101'),
	('2be733aa-9b10-4764-b85a-d466c1249be9', '623b064b-f530-4d58-b68c-21168eae0a0e', 3, '{"budget_range": "economy", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-05 02:04:13.212842'),
	('a74d54e1-0d2a-47fd-abca-eadbed386b2a', '14a13f36-a7cf-4610-ade7-e63fac0b9f71', 1, '["volume"]', '2025-07-05 02:25:12.667162'),
	('35595731-5488-4229-881c-220bc60d02a5', '14a13f36-a7cf-4610-ade7-e63fac0b9f71', 2, '["cheek_hollowing"]', '2025-07-05 02:25:18.135903'),
	('92ce4531-9947-4520-9d37-8e8a192cbb1b', '14a13f36-a7cf-4610-ade7-e63fac0b9f71', 3, '{"budget_range": "economy", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-05 02:25:30.040432'),
	('2cdb840e-6660-41d6-ae8d-8e5a4396bbcf', '2c80a681-5cba-4ad3-a255-defaf39caf99', 1, '["volume"]', '2025-07-05 02:27:41.12546'),
	('f2d529ed-9e37-4e84-b8e4-d4f3baceb317', '2c80a681-5cba-4ad3-a255-defaf39caf99', 2, '["cheek_hollowing"]', '2025-07-05 02:27:45.8758'),
	('2144ff0c-f197-42bc-a679-4bd4bde2f002', '2c80a681-5cba-4ad3-a255-defaf39caf99', 3, '{"budget_range": "economy", "recovery_time": "minimal", "stay_duration": "3_days"}', '2025-07-05 02:27:53.672414'),
	('81ecb934-33eb-46b4-acf4-7482b2e9f802', '8219f706-763c-4b9e-a7a3-ba743f25703a', 1, '["body"]', '2025-07-05 07:38:04.486508'),
	('cc64204e-f5ad-440e-ad77-2384f5afaf39', '8219f706-763c-4b9e-a7a3-ba743f25703a', 2, '["body_elasticity_loss"]', '2025-07-05 07:38:09.704276'),
	('50d965da-1e0d-4477-9f2c-e6224d962642', '8219f706-763c-4b9e-a7a3-ba743f25703a', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-05 07:38:15.506038'),
	('6915a882-3399-48c1-b875-1f4775413b14', 'b3d1676d-0f44-4b5c-903d-1b171238a0cb', 1, '["volume"]', '2025-07-05 08:20:20.998227'),
	('c4fe7494-180e-4eac-b0e7-c26a8d9ca5f8', 'b3d1676d-0f44-4b5c-903d-1b171238a0cb', 2, '["under_eye_hollowing"]', '2025-07-05 08:20:34.883919'),
	('475eb8c8-a782-4c7c-94a0-f11c489e7268', '1eeb9139-3ec3-45e9-bd46-8206f685022d', 1, '["elasticity"]', '2025-07-05 10:52:29.664975'),
	('3868a2c8-de85-4a68-801b-331a7ec419fb', '1eeb9139-3ec3-45e9-bd46-8206f685022d', 2, '["fine_lines_early"]', '2025-07-05 10:52:36.994033'),
	('c5425ee8-f4b5-4e5d-b37c-ffba5a374da5', '1eeb9139-3ec3-45e9-bd46-8206f685022d', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-05 10:52:41.607609'),
	('2fbe276c-7389-44ae-9a7d-244ef0a5f1f7', '92794b97-48d8-4e1d-a593-e6d90a57447c', 1, '["volume"]', '2025-07-05 12:45:23.363051'),
	('8212d856-5285-4c2f-a6d7-ea7029180a83', '92794b97-48d8-4e1d-a593-e6d90a57447c', 2, '["cheek_hollowing"]', '2025-07-05 12:45:27.430576'),
	('df15e9fe-4e39-4093-9636-2a993630865e', '92794b97-48d8-4e1d-a593-e6d90a57447c', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-05 12:45:30.168965'),
	('0925a5b6-265f-4e77-aa59-300b358699a9', '6aac8d6b-a4da-414b-998d-9a57cb4cb755', 1, '["volume"]', '2025-07-05 13:56:41.572409'),
	('3b74a930-6a93-4d82-9a27-bba933d70c5b', '6aac8d6b-a4da-414b-998d-9a57cb4cb755', 2, '["cheek_hollowing"]', '2025-07-05 13:56:44.17835'),
	('d7a7f8af-1c6f-40ed-ab5e-1433db5cf445', '6aac8d6b-a4da-414b-998d-9a57cb4cb755', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-05 13:56:46.440567'),
	('459b6320-d966-4a3a-bf48-c7cd0d581bde', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 1, '["elasticity"]', '2025-07-06 01:44:25.359913'),
	('350cd455-4a4d-4096-840e-c54f325292a4', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 2, '["cheek_jaw_sagging"]', '2025-07-06 01:44:27.988347'),
	('e0dde267-349d-4807-867e-f956ffc6c065', 'd8661145-c9e5-4423-8fb8-5abdeb4d6d6d', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-06 01:44:30.689706'),
	('8a045c50-4b85-4013-9d3f-2fb677b6af86', '04740ac3-0abf-4071-ac36-6765a1991cde', 1, '["volume"]', '2025-07-06 01:49:54.146398'),
	('fbeb1be1-cb7b-40f6-8c73-7ed4f9752f8d', '04740ac3-0abf-4071-ac36-6765a1991cde', 2, '["cheek_hollowing"]', '2025-07-06 01:49:57.075254'),
	('758e7d06-a665-4883-a3f9-6e12e8a6dc32', '04740ac3-0abf-4071-ac36-6765a1991cde', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-06 01:49:58.715949'),
	('f814c134-7ac1-4d0b-ae0e-1247b69deb1d', 'bf971585-2b20-47d7-9aab-4598053e4069', 1, '["skin_texture"]', '2025-07-06 01:51:36.471828'),
	('5453a117-6c9d-4970-bcb7-256c3fededca', 'bf971585-2b20-47d7-9aab-4598053e4069', 2, '["rough_texture"]', '2025-07-06 01:51:38.831202'),
	('1f4eb13d-34e3-4059-a7d2-2fde0b09791c', 'bf971585-2b20-47d7-9aab-4598053e4069', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-06 01:51:41.361579'),
	('4eff67fd-f582-4d6f-a3cc-4a2cc72b2bac', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', 1, '["volume"]', '2025-07-06 02:12:28.050188'),
	('2b5a212b-5a7c-401e-966e-f1adc6fbd98a', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', 2, '["cheek_hollowing"]', '2025-07-06 02:12:30.675163'),
	('ab7b9314-6e13-46ca-b1c0-b061ce52b149', '51a4788f-64f0-42ad-b04e-cb043c83e1c0', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-06 02:12:34.357301'),
	('0bcb1369-dc95-4af3-81d4-72ed6e2fb897', 'e1fc4bf3-644c-42df-8ad7-6c73a47b268a', 1, '["volume"]', '2025-07-07 15:48:21.133486'),
	('592e5fba-3555-4518-92d5-7dc9c75f6253', 'e1fc4bf3-644c-42df-8ad7-6c73a47b268a', 2, '["cheek_hollowing"]', '2025-07-07 15:48:28.442778'),
	('5f9c2442-f834-4727-952e-e6fe48ebe989', 'e1fc4bf3-644c-42df-8ad7-6c73a47b268a', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-07 15:48:37.151846'),
	('dc67705f-2942-4737-92d0-c24ebc5af0ac', '2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', 1, '["skin_texture"]', '2025-07-07 15:51:05.956843'),
	('447c4e89-9b07-4ab0-963f-242a7e967388', '2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', 2, '["dull_uneven_tone"]', '2025-07-07 15:52:46.144451'),
	('78c27aa2-f513-4bef-afe9-bd34e20253f5', '2b3d3ec6-33d9-4bce-8c01-9f557e7a268e', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-07 15:52:48.422046'),
	('32813455-3bbb-4cf8-aab3-9e7d0eedb75e', '0ed1288d-605c-4126-a20f-20d1b89cec0f', 1, '["skin_texture"]', '2025-07-08 04:13:43.617605'),
	('b3c3d012-59bf-43dc-94a9-15e7ebc00fbb', '0ed1288d-605c-4126-a20f-20d1b89cec0f', 2, '["rough_texture"]', '2025-07-08 04:13:49.997742'),
	('2c942b36-8077-4e82-928b-74f25935e610', '0ed1288d-605c-4126-a20f-20d1b89cec0f', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-08 04:13:57.393147'),
	('243c8d68-f259-444e-a5a3-8432ef41efec', 'ec3d45f6-d3f2-411e-990d-b4340eaf6aee', 1, '["wrinkles"]', '2025-07-08 04:15:38.226826'),
	('3be83b76-50a0-431a-923d-7ecf956c8604', 'ec3d45f6-d3f2-411e-990d-b4340eaf6aee', 2, '["neck_wrinkles"]', '2025-07-08 04:15:41.481531'),
	('76dd760e-1a77-4666-9e50-1cede224ff64', 'ec3d45f6-d3f2-411e-990d-b4340eaf6aee', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-08 04:15:43.984207'),
	('1bb32e3b-a115-4daf-8ff3-b734c525d721', '59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', 1, '["skin_texture"]', '2025-07-08 05:02:35.575876'),
	('d133fecc-ce3a-489c-883c-23e335ac182f', '59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', 2, '["acne_scars"]', '2025-07-08 05:02:44.472705'),
	('1108d299-aaad-4691-ae73-90c13d97146a', '59ae6f2e-3aee-46ed-a7d4-3a5da24b8721', 3, '{"budget_range": "standard", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-08 05:02:46.567614'),
	('3d59967e-b0d5-4119-be50-8a62f8d56fbf', 'ef26f628-e200-43a7-8df4-9b50aa806cd7', 1, '["volume"]', '2025-07-08 08:38:35.372196'),
	('3e998c42-ae40-4ef0-b39f-d6683677eaad', 'ef26f628-e200-43a7-8df4-9b50aa806cd7', 2, '["cheek_hollowing"]', '2025-07-08 08:38:38.586421'),
	('3501b548-67d2-4f88-b211-5113652f1b31', 'ef26f628-e200-43a7-8df4-9b50aa806cd7', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-08 08:38:41.363363'),
	('eff2674d-95d8-4ded-b71a-f3f1e52ed38d', '894681ea-c50b-4e01-93db-ae0d4f7b7bc7', 1, '["volume"]', '2025-07-08 14:19:51.693423'),
	('abf90906-0997-465e-af32-bc3ebc572a0b', '894681ea-c50b-4e01-93db-ae0d4f7b7bc7', 2, '["cheek_hollowing"]', '2025-07-08 14:19:54.884775'),
	('24b8f16b-12f8-4aab-8832-93ae7529d7b8', '894681ea-c50b-4e01-93db-ae0d4f7b7bc7', 3, '{"budget_range": "economy", "recovery_time": "moderate", "stay_duration": "3_days"}', '2025-07-08 14:19:57.617884');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
