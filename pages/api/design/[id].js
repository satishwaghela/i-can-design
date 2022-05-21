import { cloneDeep } from 'lodash';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const babelCore = require('@babel/core');

export default function handler(req, res) {
  const db = new JsonDB(new Config("designData", true, false, '/'));

  const { id } = req.query;
  if (req.method === 'PUT') {
    req.body.pages.forEach(page => {
      page.components.forEach((component) => {
        component.transformedComponent = babelCore.transformSync(component.component, {presets: ['@babel/preset-react']}).code;
        console.info('component.transformedComponent', component.transformedComponent)
      });
    });
    db.push(`/${id}`, req.body);
    res.status(200).json(req.body);
  } else if (req.method === 'GET') {
    try {
      const data = db.getData(`/${id}`);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(404).json({ msg: 'Design not found!' });
    }
  }
}
