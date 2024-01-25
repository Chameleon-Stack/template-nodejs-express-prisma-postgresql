-- CreateTable
CREATE TABLE "CardCategory" (
    "card_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "PK_c779eba9a60a88c1f1e98df9452" PRIMARY KEY ("card_id","category_id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,

    CONSTRAINT "PK_f8d646c98446cc0ef6872e960cc" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "PK_c2727780c5b9b0c564c29a4977c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "photo" VARCHAR,

    CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IDX_0ee83a5dddfb581a124180ef1d" ON "CardCategory"("card_id");

-- CreateIndex
CREATE INDEX "IDX_e675a079ca975585da4dc22f5b" ON "CardCategory"("category_id");

-- AddForeignKey
ALTER TABLE "CardCategory" ADD CONSTRAINT "FK_0ee83a5dddfb581a124180ef1da" FOREIGN KEY ("card_id") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardCategory" ADD CONSTRAINT "FK_e675a079ca975585da4dc22f5b9" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "FK_be3144c782c5a87f7f3307c5fbe" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "FK_b0599b55851d01efb86c7955cf2" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

