import React, { useContext } from 'react';
import { Card } from '../../blocks/card/Card';
import { configContext } from '@imagine-cms/web';
import { YoutubeVideo } from '../../../site-ui/components/youtube-video/YoutubeVideo';
import { ImagineLogoContainer } from '../../../site-ui/screens/imagine-screen/ImagineScreen.styled';

export function CerberusScreen() {
  const { config } = useContext(configContext);

  return (
    <>
      <h1>Cerberus</h1>
      <Card header="About">
        <div style={{ display: 'flex', gap: 16 }}>
          <ImagineLogoContainer>
            <img src="https://i.imgur.com/CtyHVEq.png" height={250} width={250} loading="lazy" />
          </ImagineLogoContainer>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p>Crafted with precision using the latest technology, it's not just a CMS; it's a game-changer for retros everywhere.</p>
            <p>Imagine offers the unbeatable combination of top-tier performance, blazing-fast speeds, and a development experience that's second to none.</p>
            <p>Solely designed and developed from the ground up by <a href="https://github.com/habbo-hotel" target="_blank" style={{ cursor: 'pointer' }} className="lechris" rel="noreferrer"><b>LeChris</b></a></p>
            <p><b>Version: </b>RP-{config?.softwareVersion ?? 'xxx'}</p>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <YoutubeVideo videoID="7Kn0V5mpJe4" startAt={15} />
        <div>WE MAKING IT OUT OF THE PRESCHOOL WITH THIS ONE 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥💯💯💯💯💯💯💯💯💯</div>
      </Card>
    </>
  )
}