import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from '../store/store';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import { getDesignState } from '../store/designSlice';

export default function Home(props) {
  const router = useRouter();
  const designState = useSelector(getDesignState);
  const [projects, setProjects] = useState({});

  const fetchProjects =  async () => {
    const res = await axios.get(`/api/design`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateNew = async () => {
    const newDesign = { ...designState, id: uuidv4() };
    await axios.put(`/api/design/${newDesign.id}`, newDesign);
    router.push(`/design/${newDesign.id}`)
  };

  return (
    <Box m={3}>
      <Grid container spacing={2}>
        <Grid item lg={3}>
          <Card onClick={() => handleCreateNew()}>
            Create New
          </Card>
        </Grid>
        {map(projects, (project) => {
          return (
            <Grid item lg={3}>
              <Card onClick={() => router.push(`/design/${project.id}`)}>
                {project.id}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}
