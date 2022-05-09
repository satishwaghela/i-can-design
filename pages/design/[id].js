import * as React from 'react';
import { useRouter } from 'next/router';

import NewDesign from '../../components/designToolContainer/NewDesign';
import EditDesign from '../../components/designToolContainer/EditDesign';

export default function Page(props) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;
  else if (id === 'new') return <NewDesign />;
  else return <EditDesign />;
}
