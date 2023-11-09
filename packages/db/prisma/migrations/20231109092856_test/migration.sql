-- CreateTable
CREATE TABLE "test_employee" (
    "id" SERIAL NOT NULL,
    "org_id" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3) NOT NULL DEFAULT '9999-12-31 23:59:59.999'::timestamp without time zone,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "internal_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "test_employee_pkey" PRIMARY KEY ("id")
);
