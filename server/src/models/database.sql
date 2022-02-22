
-- Table: public.clients

-- DROP TABLE public.clients;

CREATE TABLE public.clients (
  client_balance numeric(8, 2) NULL,
  client_phone character varying(50) NULL,
  client_email character varying(100) NULL,
  client_name character varying(100) NOT NULL,
  client_id SERIAL PRIMARY KEY
);


CREATE TABLE public.transactions (
  transaction_created_at timestamp without time zone DEFAULT now() NOT NULL,
  amount numeric(8, 2) NULL,
  beneficiary_id integer NULL,
  sender_id integer NULL,
  transaction_id SERIAL PRIMARY KEY
);
ALTER TABLE
  public.transactions
ADD
  CONSTRAINT transactions_sender_id_fkey FOREIGN KEY (sender_id)
        REFERENCES public.clients (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;


INSERT INTO clients (client_name,client_phone,client_email, client_balance)
VALUES
  ('Scarlet Beasley','(187) 543-7942','adipiscing.lacus@yahoo.net', 900),
  ('Desirae Sparks','1-154-337-2501','malesuada.fringilla@outlook.org', 1400),
  ('Quamar Greene','(655) 618-3325','nunc.sit.amet@icloud.net', 600),
  ('Hamilton Johns','1-862-278-3774','varius.nam.porttitor@icloud.com', 5000),
  ('Amelia Foreman','(752) 215-1623','velit.quisque.varius@google.ca', 3500),
  ('Tobias Joyner','1-736-384-6398','vivamus@protonmail.net', 780),
  ('Mariam Shields','1-506-634-4574','risus.a.ultricies@aol.edu', 6000),
  ('Quail Chambers','1-436-587-2658','metus.eu@aol.edu', 9000),
  ('Drew Battle','(368) 263-8943','sed.orci@google.org', 560),
  ('Wyoming Bird','1-853-767-1575','mattis.velit.justo@icloud.edu', 874);