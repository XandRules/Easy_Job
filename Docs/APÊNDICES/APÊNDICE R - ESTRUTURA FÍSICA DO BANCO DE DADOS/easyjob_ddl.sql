--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10 (Debian 11.10-1.pgdg90+1)
-- Dumped by pg_dump version 12.4

-- Started on 2020-11-20 14:50:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2988 (class 1262 OID 24576)
-- Name: easyjob; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE easyjob WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE easyjob OWNER TO postgres;

\connect easyjob

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 24577)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24605)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    public_place character varying(255) NOT NULL,
    neighborhood character varying(255) NOT NULL,
    uf character varying(255) NOT NULL,
    number character varying(255) NOT NULL,
    cep character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 24603)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.addresses_id_seq OWNER TO postgres;

--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 201
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 208 (class 1259 OID 24677)
-- Name: announcements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.announcements (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    period character varying(255) NOT NULL,
    amount character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    day_of_week character varying(255) NOT NULL,
    freelancer_id integer NOT NULL,
    speciality_id integer NOT NULL,
    file_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.announcements OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 24675)
-- Name: announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.announcements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.announcements_id_seq OWNER TO postgres;

--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 207
-- Name: announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.announcements_id_seq OWNED BY public.announcements.id;


--
-- TOC entry 210 (class 1259 OID 24703)
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    message character varying(255),
    room character varying(255) NOT NULL,
    to_user character varying(255) NOT NULL,
    from_user character varying(255) NOT NULL,
    date timestamp with time zone,
    freelancer_id integer,
    establishment_id integer,
    announcement_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24701)
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chats_id_seq OWNER TO postgres;

--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 209
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- TOC entry 206 (class 1259 OID 24649)
-- Name: establishments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.establishments (
    id integer NOT NULL,
    company_name character varying(255) NOT NULL,
    social_reason character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    cnpj character varying(255) NOT NULL,
    bio text,
    id_hash character varying(255),
    active boolean NOT NULL,
    terms_of_use boolean DEFAULT false NOT NULL,
    avatar_id integer,
    address_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.establishments OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24647)
-- Name: establishments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.establishments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.establishments_id_seq OWNER TO postgres;

--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 205
-- Name: establishments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.establishments_id_seq OWNED BY public.establishments.id;


--
-- TOC entry 200 (class 1259 OID 24592)
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    path character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.files OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 24590)
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO postgres;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 199
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- TOC entry 204 (class 1259 OID 24616)
-- Name: freelancers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.freelancers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    cpf character varying(255) NOT NULL,
    bio text,
    id_hash character varying(255),
    birth timestamp with time zone NOT NULL,
    gender character varying(255) NOT NULL,
    active boolean NOT NULL,
    terms_of_use boolean DEFAULT false NOT NULL,
    avatar_id integer,
    speciality_id integer,
    address_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.freelancers OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24614)
-- Name: freelancers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.freelancers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.freelancers_id_seq OWNER TO postgres;

--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 203
-- Name: freelancers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.freelancers_id_seq OWNED BY public.freelancers.id;


--
-- TOC entry 212 (class 1259 OID 24729)
-- Name: initial_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.initial_jobs (
    id integer NOT NULL,
    to_user character varying(255) NOT NULL,
    from_user character varying(255) NOT NULL,
    comment character varying(255),
    begin_time character varying(255),
    end_time character varying(255),
    date timestamp with time zone NOT NULL,
    amount integer NOT NULL,
    accepted boolean,
    announcement_id integer,
    establishment_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.initial_jobs OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24727)
-- Name: initial_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.initial_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.initial_jobs_id_seq OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 211
-- Name: initial_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.initial_jobs_id_seq OWNED BY public.initial_jobs.id;


--
-- TOC entry 214 (class 1259 OID 24750)
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id integer NOT NULL,
    freelancer_evaluation integer,
    freelancer_comment character varying(255),
    establishment_evaluation integer,
    establishment_comment character varying(255),
    date timestamp with time zone NOT NULL,
    freelancer_id integer,
    establishment_id integer,
    announcement_id integer,
    initial_job_id integer,
    canceled_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 24748)
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO postgres;

--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 213
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- TOC entry 198 (class 1259 OID 24584)
-- Name: specialities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specialities (
    id integer NOT NULL,
    speciality_function character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.specialities OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 24582)
-- Name: specialities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specialities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialities_id_seq OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 197
-- Name: specialities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specialities_id_seq OWNED BY public.specialities.id;


--
-- TOC entry 2802 (class 2604 OID 24608)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 2807 (class 2604 OID 24680)
-- Name: announcements id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements ALTER COLUMN id SET DEFAULT nextval('public.announcements_id_seq'::regclass);


--
-- TOC entry 2808 (class 2604 OID 24706)
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- TOC entry 2805 (class 2604 OID 24652)
-- Name: establishments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments ALTER COLUMN id SET DEFAULT nextval('public.establishments_id_seq'::regclass);


--
-- TOC entry 2801 (class 2604 OID 24595)
-- Name: files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- TOC entry 2803 (class 2604 OID 24619)
-- Name: freelancers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers ALTER COLUMN id SET DEFAULT nextval('public.freelancers_id_seq'::regclass);


--
-- TOC entry 2809 (class 2604 OID 24732)
-- Name: initial_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initial_jobs ALTER COLUMN id SET DEFAULT nextval('public.initial_jobs_id_seq'::regclass);


--
-- TOC entry 2810 (class 2604 OID 24753)
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- TOC entry 2800 (class 2604 OID 24587)
-- Name: specialities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialities ALTER COLUMN id SET DEFAULT nextval('public.specialities_id_seq'::regclass);


--
-- TOC entry 2812 (class 2606 OID 24581)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 2820 (class 2606 OID 24613)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 2838 (class 2606 OID 24685)
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- TOC entry 2840 (class 2606 OID 24711)
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- TOC entry 2830 (class 2606 OID 24664)
-- Name: establishments establishments_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_cnpj_key UNIQUE (cnpj);


--
-- TOC entry 2832 (class 2606 OID 24660)
-- Name: establishments establishments_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_email_key UNIQUE (email);


--
-- TOC entry 2834 (class 2606 OID 24662)
-- Name: establishments establishments_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_phone_key UNIQUE (phone);


--
-- TOC entry 2836 (class 2606 OID 24658)
-- Name: establishments establishments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_pkey PRIMARY KEY (id);


--
-- TOC entry 2816 (class 2606 OID 24602)
-- Name: files files_path_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_path_key UNIQUE (path);


--
-- TOC entry 2818 (class 2606 OID 24600)
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- TOC entry 2822 (class 2606 OID 24631)
-- Name: freelancers freelancers_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_cpf_key UNIQUE (cpf);


--
-- TOC entry 2824 (class 2606 OID 24627)
-- Name: freelancers freelancers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_email_key UNIQUE (email);


--
-- TOC entry 2826 (class 2606 OID 24629)
-- Name: freelancers freelancers_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_phone_key UNIQUE (phone);


--
-- TOC entry 2828 (class 2606 OID 24625)
-- Name: freelancers freelancers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_pkey PRIMARY KEY (id);


--
-- TOC entry 2842 (class 2606 OID 24737)
-- Name: initial_jobs initial_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initial_jobs
    ADD CONSTRAINT initial_jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 2844 (class 2606 OID 24758)
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- TOC entry 2814 (class 2606 OID 24589)
-- Name: specialities specialities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialities
    ADD CONSTRAINT specialities_pkey PRIMARY KEY (id);


--
-- TOC entry 2852 (class 2606 OID 24696)
-- Name: announcements announcements_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2850 (class 2606 OID 24686)
-- Name: announcements announcements_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.freelancers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2851 (class 2606 OID 24691)
-- Name: announcements announcements_speciality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_speciality_id_fkey FOREIGN KEY (speciality_id) REFERENCES public.specialities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2855 (class 2606 OID 24722)
-- Name: chats chats_announcement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_announcement_id_fkey FOREIGN KEY (announcement_id) REFERENCES public.announcements(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2854 (class 2606 OID 24717)
-- Name: chats chats_establishment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_establishment_id_fkey FOREIGN KEY (establishment_id) REFERENCES public.establishments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2853 (class 2606 OID 24712)
-- Name: chats chats_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.freelancers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2849 (class 2606 OID 24670)
-- Name: establishments establishments_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2848 (class 2606 OID 24665)
-- Name: establishments establishments_avatar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.establishments
    ADD CONSTRAINT establishments_avatar_id_fkey FOREIGN KEY (avatar_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2847 (class 2606 OID 24642)
-- Name: freelancers freelancers_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2845 (class 2606 OID 24632)
-- Name: freelancers freelancers_avatar_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_avatar_id_fkey FOREIGN KEY (avatar_id) REFERENCES public.files(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2846 (class 2606 OID 24637)
-- Name: freelancers freelancers_speciality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freelancers
    ADD CONSTRAINT freelancers_speciality_id_fkey FOREIGN KEY (speciality_id) REFERENCES public.specialities(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2856 (class 2606 OID 24738)
-- Name: initial_jobs initial_jobs_announcement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initial_jobs
    ADD CONSTRAINT initial_jobs_announcement_id_fkey FOREIGN KEY (announcement_id) REFERENCES public.announcements(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2857 (class 2606 OID 24743)
-- Name: initial_jobs initial_jobs_establishment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.initial_jobs
    ADD CONSTRAINT initial_jobs_establishment_id_fkey FOREIGN KEY (establishment_id) REFERENCES public.establishments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2860 (class 2606 OID 24769)
-- Name: jobs jobs_announcement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_announcement_id_fkey FOREIGN KEY (announcement_id) REFERENCES public.announcements(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2859 (class 2606 OID 24764)
-- Name: jobs jobs_establishment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_establishment_id_fkey FOREIGN KEY (establishment_id) REFERENCES public.establishments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2858 (class 2606 OID 24759)
-- Name: jobs jobs_freelancer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_freelancer_id_fkey FOREIGN KEY (freelancer_id) REFERENCES public.freelancers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2861 (class 2606 OID 24774)
-- Name: jobs jobs_initial_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_initial_job_id_fkey FOREIGN KEY (initial_job_id) REFERENCES public.initial_jobs(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-11-20 14:50:01

--
-- PostgreSQL database dump complete
--

