/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';
import config from '../config/config';
const env = process.env.NODE_ENV || 'development';

export const sequelize =
  env !== 'test'
    ? new Sequelize(
        `${process.env.DATABASE_NAME}`,
        `${process.env.DATABASE_USERNAME}`,
        `${process.env.DATABASE_PASSWORD}`,
        {
          host: `${process.env.DATABASE_HOST}`,
          port: parseInt(process.env.DATABASE_PORT || '3306'),
          logging: console.log,
          dialect: 'mysql',
          dialectModule: mysql,
          retry: {
            match: [/Deadlock/i],
            max: 3, // Maximum rety 3 times
            backoffBase: 100, // Initial backoff duration in ms. Default: 100,
            backoffExponent: 1.1, // Exponent to increase backoff each try. Default: 1.1
          },
        }
      )
    : new Sequelize((config as Record<string, any>)[env]);
