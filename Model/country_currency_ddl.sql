/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 15.2 		*/
/*  Created On : 26-янв-2023 14:55:13 				*/
/*  DBMS       : PostgreSQL 						*/
/* ---------------------------------------------------- */

/* Drop Tables */

DROP TABLE IF EXISTS dictionary.country CASCADE
;

DROP TABLE IF EXISTS dictionary.currency CASCADE
;

DROP TABLE IF EXISTS dictionary.holiday_country CASCADE
;

DROP TABLE IF EXISTS dictionary.holiday_currency CASCADE
;

/* Drop Sequences */

DROP SEQUENCE  IF EXISTS  dictionary.currency_currency_id_seq  CASCADE
;

/* Create Sequences */

CREATE SEQUENCE dictionary.currency_currency_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1
;


/* Create Tables */

CREATE TABLE dictionary.country
(
	country_id bigint NOT NULL,	-- Уникальный идентификатор записи | 204
	code char(3) NOT NULL,	-- Цифровой идентификатор страны | 705
	name_short varchar(100) NOT NULL,	-- Краткое наименование страны | СЛОВЕНИЯ
	name_full varchar(200) NULL,	-- Полное наименование страны | РЕСПУБЛИКА СЛОВЕНИЯ
	name_eng varchar(100) NULL,	-- Наименование страны латиницей | SLOVENIA
	code_alpha2 char(2) NOT NULL,	-- Буквенный 2x символьный идентификатор страны | SI
	code_alpha3 char(3) NOT NULL,	-- Буквенный 3x символьный идентификатор страны | SVN
	is_simple_tax boolean NULL,	-- Признак упрощенного налогообложения | FALSE
	is_div365 boolean NULL,	-- Дивиденды 365: True - да | TRUE
	is_act365 boolean NULL	-- Акции 365: TRUE - да | TRUE
)
;

CREATE TABLE dictionary.currency
(
	currency_id bigint NOT NULL,	-- Идентификатор | 9090
	currency_type_id bigint NOT NULL   DEFAULT 1,	-- Тип актива | 1
	code char(3) NOT NULL,	-- Уникальный цифровой код валюты | A90
	name varchar(100) NOT NULL,	-- Наименование валюты (драгметалла) на русском языке | Золото в унциях
	ascii_code char(3) NOT NULL	-- Уникальный буквенный код валюты | A90
)
;

CREATE TABLE dictionary.holiday_country
(
	holiday_uid uuid NOT NULL,
	country_id bigint NOT NULL,	-- ID страны | 0
	day date NOT NULL,	-- Дата | 08.03.2022
	type smallint NOT NULL,	-- Тип дня | 0 (0 - выходной/праздничный, 1 - рабочий)
	comment varchar(100) NULL	-- Комментарий | 8 марта
)
;

CREATE TABLE dictionary.holiday_currency
(
	holiday_uuid uuid NOT NULL,
	currency_id bigint NOT NULL,	--  Уникальный идентификатор валюты | 9090
	day date NOT NULL,	-- Дата | 08.03.2022
	type smallint NOT NULL,	-- Тип дня | 0  (0 - выходной/праздничный, 1 - рабочий)
	comment varchar(100) NULL	-- Комментарий | 8 марта
)
;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE dictionary.country ADD CONSTRAINT pk_dictionary_country
	PRIMARY KEY (country_id)
;

ALTER TABLE dictionary.currency ADD CONSTRAINT pk_dictionary_currency
	PRIMARY KEY (currency_id)
;

ALTER TABLE dictionary.currency 
  ADD CONSTRAINT currency_ascii_code_key UNIQUE (ascii_code)
;

ALTER TABLE dictionary.currency 
  ADD CONSTRAINT currency_code_key UNIQUE (code)
;

ALTER TABLE dictionary.holiday_country ADD CONSTRAINT pk_dictionary_holiday_country
	PRIMARY KEY (holiday_uid)
;

CREATE INDEX ixfk_dictionary_holiday_country_country ON dictionary.holiday_country (country_id ASC)
;

ALTER TABLE dictionary.holiday_currency ADD CONSTRAINT pk_dictionary_holiday_currency
	PRIMARY KEY (holiday_uuid)
;

CREATE INDEX ixfk_dictionary_holiday_currency_currency ON dictionary.holiday_currency (currency_id ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE dictionary.currency ADD CONSTRAINT fk_dictionary_currency_currency_type
	FOREIGN KEY (currency_type_id) REFERENCES dictionary.currency_type (currency_type_id) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE dictionary.holiday_country ADD CONSTRAINT fk_dictionary_holiday_country_country
	FOREIGN KEY (country_id) REFERENCES dictionary.country (country_id) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE dictionary.holiday_currency ADD CONSTRAINT fk_dictionary_holiday_currency_currency
	FOREIGN KEY (currency_id) REFERENCES dictionary.currency (currency_id) ON DELETE No Action ON UPDATE No Action
;

/* Create Table Comments, Sequences for Autonumber Columns */

COMMENT ON TABLE dictionary.country
	IS 'Справочник стран'
;

COMMENT ON COLUMN dictionary.country.country_id
	IS 'Уникальный идентификатор записи | 204'
;

COMMENT ON COLUMN dictionary.country.code
	IS 'Цифровой идентификатор страны | 705'
;

COMMENT ON COLUMN dictionary.country.name_short
	IS 'Краткое наименование страны | СЛОВЕНИЯ'
;

COMMENT ON COLUMN dictionary.country.name_full
	IS 'Полное наименование страны | РЕСПУБЛИКА СЛОВЕНИЯ'
;

COMMENT ON COLUMN dictionary.country.name_eng
	IS 'Наименование страны латиницей | SLOVENIA'
;

COMMENT ON COLUMN dictionary.country.code_alpha2
	IS 'Буквенный 2x символьный идентификатор страны | SI'
;

COMMENT ON COLUMN dictionary.country.code_alpha3
	IS 'Буквенный 3x символьный идентификатор страны | SVN'
;

COMMENT ON COLUMN dictionary.country.is_simple_tax
	IS 'Признак упрощенного налогообложения | FALSE'
;

COMMENT ON COLUMN dictionary.country.is_div365
	IS 'Дивиденды 365: True - да | TRUE'
;

COMMENT ON COLUMN dictionary.country.is_act365
	IS 'Акции 365: TRUE - да | TRUE'
;

COMMENT ON TABLE dictionary.currency
	IS 'Справочник валют и драгоценных металлов'
;

COMMENT ON COLUMN dictionary.currency.currency_id
	IS 'Идентификатор | 9090'
;

COMMENT ON COLUMN dictionary.currency.currency_type_id
	IS 'Тип актива | 1'
;

COMMENT ON COLUMN dictionary.currency.code
	IS 'Уникальный цифровой код валюты | A90'
;

COMMENT ON COLUMN dictionary.currency.name
	IS 'Наименование валюты (драгметалла) на русском языке | Золото в унциях'
;

COMMENT ON COLUMN dictionary.currency.ascii_code
	IS 'Уникальный буквенный код валюты | A90'
;

COMMENT ON TABLE dictionary.holiday_country
	IS 'Производственный календарь стран'
;

COMMENT ON COLUMN dictionary.holiday_country.country_id
	IS 'ID страны | 0'
;

COMMENT ON COLUMN dictionary.holiday_country.day
	IS 'Дата | 08.03.2022'
;

COMMENT ON COLUMN dictionary.holiday_country.type
	IS 'Тип дня | 0 (0 - выходной/праздничный, 1 - рабочий)'
;

COMMENT ON COLUMN dictionary.holiday_country.comment
	IS 'Комментарий | 8 марта'
;

COMMENT ON TABLE dictionary.holiday_currency
	IS 'Производственный календарь валют'
;

COMMENT ON COLUMN dictionary.holiday_currency.currency_id
	IS ' Уникальный идентификатор валюты | 9090'
;

COMMENT ON COLUMN dictionary.holiday_currency.day
	IS 'Дата | 08.03.2022'
;

COMMENT ON COLUMN dictionary.holiday_currency.type
	IS 'Тип дня | 0  (0 - выходной/праздничный, 1 - рабочий)'
;

COMMENT ON COLUMN dictionary.holiday_currency.comment
	IS 'Комментарий | 8 марта'
;
