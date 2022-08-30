import gql from 'graphql-tag';
import {useLocation} from 'wouter';
import {useRunQuery} from '../../graphql/run-query';
import {useRunMutation} from '../../graphql/run-mutation';
import {SessionCreatedWire, UserWire} from '@imagine-cms/types';
import {setGraphqlAccessToken} from '../../graphql/graphql.client';
import {sessionContext} from '../../context/session/SessionContext';
import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {UsernameWithAvatarInput} from './username-with-avatar-input/UsernameWithAvatarInput';

const LOGIN_WITH_USERNAME_AND_PASSWORD = gql`
    mutation($username: String!, $password: String!) {
        sessionCreate(sessionCreateInput: { username: $username, password: $password }) {
            id,
            userID,
            accessToken
        }
    }
`

const FIND_USER_BY_ID = gql`
    query($userID: Float!) {
        user(id: $userID) {
            id,
            username,
            email,
            rankID,
            rankVipID,
            credits,
            vipPoints,
            activityPoints,
            look,
            gender,
            motto,
            accountCreatedAt,
            lastOnline,
            onlineStatus,
            ipRegisteredWith,
            homeRoomID,
            muteStatus,
            allowingNewFriends,
            showOnlineStatus,
            vipStatus,
        }
    }
`

export function LoginScreen() {
  const [location, setLocation] = useLocation();
  const {setSession} = useContext(sessionContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginWithUsernameAndPassword = useRunMutation<{sessionCreate: SessionCreatedWire}>(LOGIN_WITH_USERNAME_AND_PASSWORD, { username, password })
  const fetchUserBySessionID = useRunQuery<UserWire>(FIND_USER_BY_ID, { userID: loginWithUsernameAndPassword?.data?.sessionCreate?.userID })

  const onLogin = async (event?: SyntheticEvent) => {
    event?.preventDefault();
    loginWithUsernameAndPassword.runQuery();
  }

  useEffect(() => {
    if (loginWithUsernameAndPassword.data) {
      setGraphqlAccessToken(loginWithUsernameAndPassword.data.sessionCreate.accessToken!);
      fetchUserBySessionID.runQuery();
    }
  }, [loginWithUsernameAndPassword.data]);

  useEffect(() => {
    setSession(fetchUserBySessionID.data);
    setLocation('/me');
  }, [fetchUserBySessionID.data]);

  console.log(loginWithUsernameAndPassword.data);
  console.log(fetchUserBySessionID.data);

  return (
    <main className="position-relative container justify-content-center py-4">
      <div className="row justify-content-center">
        <div className="col-lg-11 mb-4">
          <div className="w-full d-flex align-items-center justify-content-center flex-column rounded-lg py-4 px-4" style={{background: 'url(https://cdn.discordapp.com/attachments/361693054744133642/977198815209730119/unknown.png) no-repeat center center / cover', boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, .6)' }}>

            <h4 className="text-white mb-2">We're putting the weekly rare rotations in your hands!</h4>
            <p className="text-white mb-1">You can now vote for 5 items you'd like to see in the catalog for a week. <a
              href="https://www.habboon.pw/voting/rare-rotations" className="font-weight-bolder">Click here</a> to get
              involved.</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-3 d-lg-block d-none">
          <h5 className="silver">Latest Article <span className="float-right"><i
            className="fas fa-newspaper"></i></span></h5>
          <div id="articles-strip">
            <div className="row">
              <div className="col-12">
                <a href="https://www.habboon.pw/articles/4947-gamer-of-the-week-177"
                   aria-label="Gamer of the Week #177">
                </a>
                <div className="card"><a href="https://www.habboon.pw/articles/4947-gamer-of-the-week-177"
                                         aria-label="Gamer of the Week #177">
                  <div className="card-body" style={{backgroundImage: 'url(https://www.habboon.pw/web-gallery/web_promos/promo_hlmpc12.png)'}}>
                    <div className="avatar">
                      <img
                        src="https://imager.habboon.pw?figure=hd-600-10.lg-4375-64.fa-3276-1329.sh-4064-1325.hr-4182-1405-61.cc-4137-1325.he-3999-1325-64.ha-4192-1408.ch-4392-64-1422.ca-50062-1422-110&amp;size=m&amp;direction=2&amp;head_direction=2&amp;gesture=sml&amp;headonly=1"
                        alt="Michaela" data-toggle="tooltip" data-placement="top" data-title="Michaela" loading="lazy"
                        data-original-title="" title="" />
                    </div>
                  </div>
                </a>
                  <div className="card-footer"><a href="https://www.habboon.pw/articles/4947-gamer-of-the-week-177"
                                                  aria-label="Gamer of the Week #177">
                  </a><h6><a href="https://www.habboon.pw/articles/4947-gamer-of-the-week-177"
                             aria-label="Gamer of the Week #177"></a><a
                    href="https://www.habboon.pw/articles/4947-gamer-of-the-week-177"
                    aria-label="Gamer of the Week #177">Gamer of the Week #177</a></h6>
                    <p>Now that's epic!<br/><br/></p>
                    <div className="info">
                      <div className="initial">
                        <span className="username">Michaela</span>
                        <span className="published"><i className="fas fa-clock"></i> 3 hours ago</span>
                      </div>
                      <div className="audience">
                        <span className="comments"><i className="fas fa-comments"></i> 0</span>
                        <span className="views"><i className="fas fa-eye"></i> 16</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="silver">Login to Habboon!</h5>
              <form className="form" onSubmit={onLogin}>
                <UsernameWithAvatarInput username={username} onChange={setUsername} />
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" className="form-control" id="password" placeholder="Password" autoComplete="current-password" required value={password} onChange={(e: any) => setPassword(e?.currentTarget?.value ?? '')} />
                </div>
                  <p><small><a href="https://www.habboon.pw/password/reset" aria-label="Forgot your password?">Forgot
                    your password?</a></small></p>
                  <div className="form-group mb-0">
                    <button className="btn btn-primary btn-block" type="submit">Login</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-lg-block d-none">
          Widgets
        </div>
      </div>
    </main>
  )
}
