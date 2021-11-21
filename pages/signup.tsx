import {useEffect, useState} from 'react';
import Head from 'next/head'
import * as Yup from 'yup';
import {useFormik} from 'formik';

import {RegisterRequest} from '../components/core/types/auth';
import {AuthService} from '../components/core/api-services/auth.service';
import Layout from '../components/layout/layout';
import useAlert from '../components/ui-kit/dialog/use-alert'
import Spinner from '../components/ui-kit/common/spinner';
import {useRouter} from 'next/router';

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const alertService = useAlert();
  const schema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email").required('Required'),
    password: Yup.string().required('Required'),
  });

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values: RegisterRequest) => {
      try {
        setIsLoading(true);
        const authToken = await AuthService.register(values);
        localStorage.setItem('authToken', authToken.accessToken);
        alertService.notify('Thank You!', 'Thank you for your register. Thank you for your patience.', 'Ok');
        router.push('/stake');
      } catch (e) {
        alertService.notify('Register', `Register Failed. Please try again later.`, 'Ok');
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
        <title>Stakin: SignUp</title>
        <meta name="description" content="Stakin SignUp."/>
      </Head>
      <Layout>
        <Spinner isLoading={isLoading}/>
        <div className="h-600 flex items-center">
          <form className="w-full flex items-center justify-center" onSubmit={form.handleSubmit}>
            <div className="w-full sm:w-1/2 lg:w-1/3 sm:mx-10 border border-light-400">
              <p className="bg-warning text-white text-16 text-center py-10">SignUp</p>
              <div className="p-15">
                <div className="flex py-5 items-center">
                  <label className="w-1/3 text-right mr-5">Full Name:</label>
                  <input type="text" className="input w-2/3 border border-light-200" name="fullName"
                         value={form.values.fullName} onChange={form.handleChange}/>
                </div>
                <div className="flex py-5 items-center">
                  <label className="w-1/3 text-right mr-5">Email:</label>
                  <input type="text" className="input w-2/3 border border-light-200" name="email" value={form.values.email}
                         onChange={form.handleChange}/>
                </div>
                <div className="flex py-5 items-center">
                  <label className="w-1/3 text-right mr-5">Password:</label>
                  <input type="password" className="input w-2/3 border border-light-200" name="password"
                         value={form.values.password} onChange={form.handleChange}/>
                </div>
              </div>
              <div className="pb-15 flex justify-center">
                <button className="btn btn-primary btn-sm" disabled={!form.isValid}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
