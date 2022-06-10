import * as React from 'react';
import { useRouter } from 'next/router';

import EditDesign from '../../components/designToolContainer/EditDesign';

export default function Page(props) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return;
  else return <EditDesign />;
}
