import Head from 'next/head'

import Layout from '../components/layout/layout';
import {AuthService} from '../components/core/api-services/auth.service';
import {useEffect, useState} from 'react';
import {UserInfo} from '../components/core/types/auth';
import {useRouter} from 'next/router';
import Spinner from '../components/ui-kit/common/spinner';

export default function Stake() {
  const [authInfo, setAuthInfo] = useState<UserInfo>({} as any);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  useEffect(() => {
    AuthService.auth().then((info: UserInfo) => {
      setIsLoading(true);
      setAuthInfo(info)
    }).catch(e => {
      router.push('/login');
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);
  return (
    <>
      <Head>
        <title>Stakin: Stake</title>
        <meta name="description" content="Stakin Stake."/>
      </Head>
      <Layout>
        <Spinner isLoading={isLoading} />
        {authInfo.email} - {authInfo.fullName}
      </Layout>
    </>
  );
}
