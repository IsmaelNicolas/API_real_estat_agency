/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     3/17/2023 1:21:36 PM                         */
/*==============================================================*/


drop trigger TRIGGER_1;

alter table DOCUMENT 
   drop foreign key FK_DOCUMENT_PROVIDE_CLIENT;

alter table EMPLOYEE 
   drop foreign key FK_EMPLOYEE_EMPLOYEE__EMPLOYEE;

alter table PAYMENT 
   drop foreign key FK_PAYMENT_LETTER_PROPERTY;

alter table PROPERTYFEATURE 
   drop foreign key FK_PROPERTY_PROPERTYF_PROPERTY;

alter table PROPERTYFEATURE 
   drop foreign key FK_PROPERTY_PROPERTYF_FEATURE;

alter table PURCHASE 
   drop foreign key FK_PURCHASE_PURCHASE_CLIENT;

alter table PURCHASE 
   drop foreign key FK_PURCHASE_PURCHASE2_PROPERTY;

alter table STAGE_CLIENT 
   drop foreign key FK_STAGE_CL_STAGE_CLI_CLIENT;

alter table STAGE_CLIENT 
   drop foreign key FK_STAGE_CL_STAGE_CLI_STAGE;

alter table SUBSCRIBE 
   drop foreign key FK_SUBSCRIB_SUBSCRIBE_EMPLOYEE;

alter table SUBSCRIBE 
   drop foreign key FK_SUBSCRIB_SUBSCRIBE_CLIENT;

drop table if exists CLIENT;


alter table DOCUMENT 
   drop foreign key FK_DOCUMENT_PROVIDE_CLIENT;

drop table if exists DOCUMENT;


alter table EMPLOYEE 
   drop foreign key FK_EMPLOYEE_EMPLOYEE__EMPLOYEE;

drop table if exists EMPLOYEE;

drop table if exists FEATURE;


alter table PAYMENT 
   drop foreign key FK_PAYMENT_LETTER_PROPERTY;

drop table if exists PAYMENT;

drop table if exists PROPERTY;


alter table PROPERTYFEATURE 
   drop foreign key FK_PROPERTY_PROPERTYF_PROPERTY;

alter table PROPERTYFEATURE 
   drop foreign key FK_PROPERTY_PROPERTYF_FEATURE;

drop table if exists PROPERTYFEATURE;


alter table PURCHASE 
   drop foreign key FK_PURCHASE_PURCHASE_CLIENT;

alter table PURCHASE 
   drop foreign key FK_PURCHASE_PURCHASE2_PROPERTY;

drop table if exists PURCHASE;

drop table if exists STAGE;


alter table STAGE_CLIENT 
   drop foreign key FK_STAGE_CL_STAGE_CLI_CLIENT;

alter table STAGE_CLIENT 
   drop foreign key FK_STAGE_CL_STAGE_CLI_STAGE;

drop table if exists STAGE_CLIENT;


alter table SUBSCRIBE 
   drop foreign key FK_SUBSCRIB_SUBSCRIBE_EMPLOYEE;

alter table SUBSCRIBE 
   drop foreign key FK_SUBSCRIB_SUBSCRIBE_CLIENT;

drop table if exists SUBSCRIBE;

/*==============================================================*/
/* Table: CLIENT                                                */
/*==============================================================*/
create table CLIENT
(
   ID_CLIENT            varchar(10) not null  comment '',
   NAME_CLIENT          varchar(32) not null  comment '',
   LASTNAME_CLIENT      varchar(32) not null  comment '',
   PHONE_CLIENT         varchar(16) not null  comment '',
   TYPE_CLIENT          char(16) not null default 'Interesado'  comment '',
   EMAIL_CLIENT         varchar(32)  comment '',
   SPOUSE_NAME          varchar(32)  comment '',
   SPOUSE_OCUPATION     varchar(32)  comment '',
   SPOUSE_DIRECTION     varchar(64)  comment '',
   SPOUSE_SALARY        decimal(6,2)  comment '',
   SPOUSE_ENTITY        varchar(32)  comment '',
   DIRECTION_CLIENT     varchar(64)  comment '',
   OCUPATION_CLIENT     varchar(32)  comment '',
   SALARY_CLIENT        decimal(7,2)  comment '',
   MARITAL_STATUS_CLIENT varchar(8)  comment '',
   ENTITY_CLIENT        varchar(64)  comment '',
   DIRECTION_ENTITY     varchar(128)  comment '',
   primary key (ID_CLIENT)
);

/*==============================================================*/
/* Table: DOCUMENT                                              */
/*==============================================================*/
create table DOCUMENT
(
   ID_DOCUMENT          char(36) not null  comment '',
   ID_CLIENT            varchar(10) not null  comment '',
   NAME_DOCUMENT        varchar(16) not null  comment '',
   TYPE_DOCUMENT        varchar(16) not null  comment '',
   CHECK_DOCUMENT       bool  comment '',
   primary key (ID_DOCUMENT)
);

/*==============================================================*/
/* Table: EMPLOYEE                                              */
/*==============================================================*/
create table EMPLOYEE
(
   ID_EMPLOYEE          char(36) not null default 'UUID()'  comment '',
   EMP_ID_EMPLOYEE      char(36) default 'UUID()'  comment '',
   NAME_EMPLOYEE        varchar(32) not null  comment '',
   LASTNAME_EMPLOYEE    varchar(32) not null  comment '',
   EMAIL_EMPLOYEE       varchar(32) not null  comment '',
   POSITION_EMPLOYEE    varchar(16)  comment '',
   PASSWORD_EMPLOYEE    varchar(128) not null  comment '',
   PERMISSIONS          varchar(16) not null  comment '',
   primary key (ID_EMPLOYEE)
);

/*==============================================================*/
/* Table: FEATURE                                               */
/*==============================================================*/
create table FEATURE
(
   ID_FEATURE           char(36) not null default 'UUID()'  comment '',
   NAME_FEATURE         varchar(16)  comment '',
   primary key (ID_FEATURE)
);

/*==============================================================*/
/* Table: PAYMENT                                               */
/*==============================================================*/
create table PAYMENT
(
   ID_PROPERTY          char(36) not null  comment '',
   ID_PAYMENT           char(36) not null  comment '',
   DESCRIPTION_PAYMENT  varchar(32)  comment '',
   DATE_PAYMENT         date  comment '',
   VALUE_PAYMENT        decimal(7,2)  comment '',
   primary key (ID_PROPERTY, ID_PAYMENT)
);

/*==============================================================*/
/* Table: PROPERTY                                              */
/*==============================================================*/
create table PROPERTY
(
   ID_PROPERTY          char(36) not null  comment '',
   TYPE_PROPERTY        varchar(16)  comment '',
   NEIGHBORHOOD         varchar(64)  comment '',
   URBANIZATION         varchar(64)  comment '',
   MINIMUM__            int  comment '',
   QUANTITY             int  comment '',
   primary key (ID_PROPERTY)
);

/*==============================================================*/
/* Table: PROPERTYFEATURE                                       */
/*==============================================================*/
create table PROPERTYFEATURE
(
   ID_PROPERTY          char(36) not null  comment '',
   ID_FEATURE           char(36) not null default 'UUID()'  comment '',
   primary key (ID_PROPERTY, ID_FEATURE)
);

/*==============================================================*/
/* Table: PURCHASE                                              */
/*==============================================================*/
create table PURCHASE
(
   ID_CLIENT            varchar(10) not null  comment '',
   ID_PROPERTY          char(36) not null  comment '',
   primary key (ID_CLIENT, ID_PROPERTY)
);

/*==============================================================*/
/* Table: STAGE                                                 */
/*==============================================================*/
create table STAGE
(
   ID_STAGE             int not null auto_increment  comment '',
   NAME_STAGE           varchar(64)  comment '',
   primary key (ID_STAGE)
);

/*==============================================================*/
/* Table: STAGE_CLIENT                                          */
/*==============================================================*/
create table STAGE_CLIENT
(
   ID_CLIENT            varchar(10) not null  comment '',
   ID_STAGE             int not null  comment '',
   STAGE_START_DATE     date  comment '',
   STAGE_END_DATE       date  comment '',
   CONDITIONS           bool  comment '',
   primary key (ID_CLIENT, ID_STAGE)
);

/*==============================================================*/
/* Table: SUBSCRIBE                                             */
/*==============================================================*/
create table SUBSCRIBE
(
   ID_EMPLOYEE          char(36) not null default 'UUID()'  comment '',
   ID_CLIENT            varchar(10) not null  comment '',
   DATE_SUBSCRIBE       date  comment '',
   CITY_SUBSCRIBE       varchar(16)  comment ''
);

alter table DOCUMENT add constraint FK_DOCUMENT_PROVIDE_CLIENT foreign key (ID_CLIENT)
      references CLIENT (ID_CLIENT) on delete cascade on update cascade;

alter table EMPLOYEE add constraint FK_EMPLOYEE_EMPLOYEE__EMPLOYEE foreign key (EMP_ID_EMPLOYEE)
      references EMPLOYEE (ID_EMPLOYEE) on delete cascade on update cascade;

alter table PAYMENT add constraint FK_PAYMENT_LETTER_PROPERTY foreign key (ID_PROPERTY)
      references PROPERTY (ID_PROPERTY) on delete cascade on update cascade;

alter table PROPERTYFEATURE add constraint FK_PROPERTY_PROPERTYF_PROPERTY foreign key (ID_PROPERTY)
      references PROPERTY (ID_PROPERTY) on delete cascade on update cascade;

alter table PROPERTYFEATURE add constraint FK_PROPERTY_PROPERTYF_FEATURE foreign key (ID_FEATURE)
      references FEATURE (ID_FEATURE) on delete cascade on update cascade;

alter table PURCHASE add constraint FK_PURCHASE_PURCHASE_CLIENT foreign key (ID_CLIENT)
      references CLIENT (ID_CLIENT) on delete restrict on update restrict;

alter table PURCHASE add constraint FK_PURCHASE_PURCHASE2_PROPERTY foreign key (ID_PROPERTY)
      references PROPERTY (ID_PROPERTY) on delete restrict on update restrict;

alter table STAGE_CLIENT add constraint FK_STAGE_CL_STAGE_CLI_CLIENT foreign key (ID_CLIENT)
      references CLIENT (ID_CLIENT) on delete cascade on update cascade;

alter table STAGE_CLIENT add constraint FK_STAGE_CL_STAGE_CLI_STAGE foreign key (ID_STAGE)
      references STAGE (ID_STAGE) on delete cascade on update cascade;

alter table SUBSCRIBE add constraint FK_SUBSCRIB_SUBSCRIBE_EMPLOYEE foreign key (ID_EMPLOYEE)
      references EMPLOYEE (ID_EMPLOYEE) on delete restrict on update cascade;

alter table SUBSCRIBE add constraint FK_SUBSCRIB_SUBSCRIBE_CLIENT foreign key (ID_CLIENT)
      references CLIENT (ID_CLIENT) on delete restrict on update cascade;


create trigger TRIGGER_1 after insert
on DOCUMENT for each row
begin
end;

