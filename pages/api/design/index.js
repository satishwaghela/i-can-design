import { cloneDeep } from 'lodash';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const babelCore = require('@babel/core');

export default function handler(req, res) {
  const db = new JsonDB(new Config("designData", true, false, '/'));

  try {
    const data = db.getData(`/`);
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(404).json({ msg: 'Projects not found!' });
  }
}
