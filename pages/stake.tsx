import Head from 'next/head'

import solanaWeb3 from '@solana/web3.js';

import Layout from '../components/layout/layout';
import {AuthService} from '../components/core/api-services/auth.service';
import {useEffect, useState} from 'react';
import {UserInfo} from '../components/core/types/auth';
import {useRouter} from 'next/router';
import Spinner from '../components/ui-kit/common/spinner';
import {UserService} from '../components/core/api-services/user.service';
import useAlert from '../components/ui-kit/dialog/use-alert';

export default function Stake() {
  const [authInfo, setAuthInfo] = useState<UserInfo>({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [ownerPubKey, setOwnerPubKey] = useState<solanaWeb3.PublicKey>();
  const [ownerBalance, setOwnerBalance] = useState(0);
  const [stakePubKey, setStakePubKey] = useState<solanaWeb3.PublicKey>();
  const [stakeAccountBalance, setStakeAccountBalance] = useState(0);
  const [authorizedPubKey, setAuthorizedPubKey] = useState<solanaWeb3.PublicKey>();
  const [stakeAmount, setStakeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const alertService = useAlert();

  const router = useRouter();
  const solanaWeb3 = require('@solana/web3.js');

  useEffect(() => {
    AuthService.auth().then((info: UserInfo) => {
      setIsLoading(true);
      setAuthInfo(info)
      if (info.ownerPubKey) {
        setIsConnected(true);
        setOwnerPubKey(new solanaWeb3.PublicKey(info.ownerPubKey))
      }
      if (info.stakePubKey) {
        setStakePubKey(new solanaWeb3.PublicKey(info.stakePubKey));
      }
      if (info.authorizedPubKey) {
        setAuthorizedPubKey(new solanaWeb3.PublicKey(info.authorizedPubKey));
      }
    }).catch(() => {
      router.push('/login');
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  useEffect(() => {
    updateOwnerAccountBalance();
  }, [ownerPubKey]);

  useEffect(() => {
    updateStakeAccountBalance();
  }, [stakePubKey, authorizedPubKey]);

  const accountBalance = async (publicKey: solanaWeb3.PublicKey): Promise<number> => {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));
    return connection.getBalance(publicKey);
  }

  const stakeAmountHandle = (event: any) => {
    setStakeAmount(event.target.value);
  }

  const withdrawAmountHandle = (event: any) => {
    setWithdrawAmount(event.target.value);
  }

  const updateStakeAccountBalance = () => {
    if (stakePubKey) {
      setIsLoading(true);
      accountBalance(stakePubKey).then((balance: number) => {
        setStakeAccountBalance(balance);
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const updateOwnerAccountBalance = () => {
    if (ownerPubKey) {
      setIsLoading(true);
      accountBalance(ownerPubKey).then((balance: number) => {
        setOwnerBalance(balance);
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const createOwnerAccount = async () => {
    setIsLoading(true);
    UserService.createAccount().then((info: UserInfo) => {
      setAuthInfo(info);
      setIsConnected(true);
      setOwnerPubKey(new solanaWeb3.PublicKey(info.ownerPubKey));
    }).catch((e) => {
      console.log('createOwnerAccount Error', e);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const createStakeAccount = () => {
    setIsLoading(true);
    UserService.createStakeAccount().then((info: UserInfo) => {
      setAuthInfo(info);
      setStakePubKey(new solanaWeb3.PublicKey(info.stakePubKey));
      setAuthorizedPubKey(new solanaWeb3.PublicKey(info.authorizedPubKey));
    }).catch((e) => {
      console.log('createStakeAccount Error', e);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const stake = async () => {
    setIsLoading(true);
    UserService.stake(stakeAmount).then((info: UserInfo) => {
      setAuthInfo(info);
      setOwnerPubKey(new solanaWeb3.PublicKey(info.ownerPubKey));
      setStakePubKey(new solanaWeb3.PublicKey(info.stakePubKey));
      setAuthorizedPubKey(new solanaWeb3.PublicKey(info.authorizedPubKey));
    }).catch((e) => {
      console.log('createStakeAccount Error', e);
      alertService.notify('Staking Error', e.message || 'Unable to stake.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const withdraw = async () => {
    setIsLoading(true);
    UserService.withdraw(withdrawAmount).then((info: UserInfo) => {
      setAuthInfo(info);
      setOwnerPubKey(new solanaWeb3.PublicKey(info.ownerPubKey));
      setStakePubKey(new solanaWeb3.PublicKey(info.stakePubKey));
      setAuthorizedPubKey(new solanaWeb3.PublicKey(info.authorizedPubKey));
    }).catch((e) => {
      console.log('createStakeAccount Error', e);
      alertService.notify('Staking Error', e.message || 'Unable to stake.', 'Ok');
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <Head>
        <title>Stakin: Stake</title>
        <meta name="description" content="Stakin Stake."/>
      </Head>
      <Layout>
        <Spinner isLoading={isLoading}/>
        <section className="flex flex-col items-center py-30 px-10">
          <p className="text-20 font-bold mb-10 text-primary-100">{authInfo.fullName || 'Owner'}&apos;s Account Info</p>
          {!isConnected &&
          <button className="btn btn-primary btn-md" onClick={createOwnerAccount}>Connect Account</button>}
          {isConnected && <div className="text-center">
              <p>{ownerPubKey?.toBase58()}</p>
              <p>
                  Balance: {ownerBalance.toLocaleString()} (LAMPORT)
                  <button className="btn btn-warning btn-mini mx-10"
                          onClick={updateOwnerAccountBalance}>Refresh</button>
              </p>
          </div>}
        </section>
        {isConnected && <section className="flex flex-col items-center py-30 px-10">
            <p className="text-20 font-bold mb-10 text-primary-100">Stake flow</p>
            <div>
                <p className="text-center text-warning font-bold mb-10">1. Create Stake Account</p>
              {!stakePubKey &&
              <button className="btn btn-primary btn-md" onClick={createStakeAccount}>Create Stake Account</button>}
              {stakePubKey && <div className="text-center">
                  <p>{stakePubKey?.toBase58()}</p>
                  <p>
                      Stake Amount: {stakeAccountBalance.toLocaleString()} (LAMPORT)
                      <button className="btn btn-warning btn-mini mx-10"
                              onClick={updateStakeAccountBalance}>Refresh</button>
                  </p>
              </div>}
            </div>
          {stakePubKey && <div>
              <p className="text-center text-warning font-bold my-10">2. Delegate to Validator</p>
              <div>
                  <label>Stake Amount:</label>
                  <input type="number" className="input border border-light-100" name="stakeAmount"
                         onChange={stakeAmountHandle} value={stakeAmount}/>
              </div>
              <div className="flex justify-center my-10">
                {stakeAmount > ownerBalance && <p className="text-danger">Owner Balance Shortage!</p>}
                {stakeAmount <= ownerBalance && stakeAccountBalance == 0 &&
                <button className="btn btn-primary btn-md" onClick={stake}>Stake</button>}
              </div>
          </div>}
          {stakeAccountBalance > 0 && <div>
              <p className="text-center text-warning font-bold my-10">3. Withdraw Stake Amount</p>
              <div className="my-10">
                  <div>
                      <label>Withdraw Amount:</label>
                      <input type="number" className="input border border-light-100" name="withdrawAmount"
                             onChange={withdrawAmountHandle} value={withdrawAmount}/>
                  </div>
                  <div className="flex justify-center my-10">
                    {withdrawAmount <= stakeAccountBalance &&
                    <button className="btn btn-primary btn-md" onClick={withdraw}>Withdraw</button>}
                    {withdrawAmount > stakeAccountBalance && <p className="text-danger">Stake Balance Shortage!</p>}
                  </div>
              </div>
          </div>}
        </section>}
      </Layout>
    </>
  );
}
