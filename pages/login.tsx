import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head'
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {AuthService} from '../components/core/api-services/auth.service';
import {LoginRequest} from '../components/core/types/auth';
import Layout from '../components/layout/layout';
import useAlert from '../components/ui-kit/dialog/use-alert';
import Spinner from '../components/ui-kit/common/spinner';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const alertService = useAlert();
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required('Required'),
    password: Yup.string().required('Required'),
  });
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: LoginRequest) => {
      try {
        setIsLoading(true);
        const authToken = await AuthService.login(values);
        localStorage.setItem('authToken', authToken.accessToken);
        router.push('/stake');
      } catch (e) {
        alertService.notify('Login', `Login Failed. Please try again later.`, 'Ok');
      } finally {
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    form.validateForm();
  }, []);

  return (
    <>
      <Head>
        <title>Stakin: Login</title>
        <meta name="description" content="Stakin Login."/>
      </Head>
      <Layout>
        <Spinner isLoading={isLoading}/>
        <form className="w-full h-600 flex items-center justify-center" onSubmit={form.handleSubmit}>
          <div className="w-full h-full sm:h-1/3 sm:w-1/2 lg:w-1/3 sm:mx-10 border border-light-400">
            <p className="bg-warning text-white text-16 text-center py-10">Login</p>
            <div className="p-15">
              <div className="flex py-5">
                <label className="w-1/3 text-right mr-5">Email:</label>
                <input type="text" className="w-2/3 border border-light-200" name="email" value={form.values.email}
                       onChange={form.handleChange}/>
              </div>
              <div className="flex py-5">
                <label className="w-1/3 text-right mr-5">Password:</label>
                <input type="password" className="w-2/3 border border-light-200" name="password"
                       value={form.values.password} onChange={form.handleChange}/>
              </div>
            </div>
            <div className="py-5 flex justify-center">
              <button className="btn btn-primary btn-sm" disabled={!form.isValid}>Login</button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
}
