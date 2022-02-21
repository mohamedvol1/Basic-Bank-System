
-- Table: public.clients

-- DROP TABLE public.clients;

CREATE TABLE public.clients
(
    client_id integer NOT NULL DEFAULT nextval('customers_customerid_seq'::regclass),
    client_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    client_email character varying(100) COLLATE pg_catalog."default",
    client_phone character varying(50) COLLATE pg_catalog."default",
    client_balance numeric(8,2),
    CONSTRAINT customers_pkey PRIMARY KEY (client_id)
)

CREATE TABLE public.transactions
(
    transaction_id integer NOT NULL DEFAULT nextval('transactions_transaction_id_seq'::regclass),
    sender_id integer,
    beneficiary_id integer,
    amount numeric(8,2),
    transaction_created_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
    CONSTRAINT transactions_sender_id_fkey FOREIGN KEY (sender_id)
        REFERENCES public.clients (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)