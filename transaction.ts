// eslint-disable-next-line import/no-relative-parent-imports
import db from "@/models/index";

let transaction: any;
export const startTransaction = async (): Promise<void> => {
  const continuationLocalStorage = new Map();
  Object.defineProperty(continuationLocalStorage, "run", {
    value: (fn: any) => {
      fn(this);
      return this;
    },
  });
  transaction = await db.sequelize.transaction();

  db.sequelize.constructor._cls = continuationLocalStorage;
  db.sequelize.constructor._cls.set("transaction", transaction);
};

export const rollbackTransaction = async (): Promise<void> => {
  if (!transaction.finished) {
    await transaction.rollback();
  }

  await transaction.cleanup();
};
