import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';

const DataBranching = () => (
  <section className="mt-[270px] safe-paddings 3xl:mt-44 2xl:mt-40 xl:mt-32 lg:mt-24 md:mt-20">
    <Container>
      <div className="max-w-[600px] xl:max-w-[400px] lg:max-w-none">
        <Heading tag="h2" size="lg" theme="black">
          Data Branching
        </Heading>
        <p className="mt-8 t-xl 3xl:max-w-[504px] 2xl:max-w-[416px] 2xl:mt-7 xl:mt-6 lg:max-w-none">
          Zenith storage allows users to branch the entire Postgres cluster, making it ideal for
          developer, staging, and production environments. Use CLI from your CI/CD process to create
          a new branch from the current environment for every deploy preview.
        </p>
        <Link className="mt-6 2xl:mt-5 xl:mt-4" to="/" size="md" theme="black-primary-1">
          Getting started with data branching
        </Link>
      </div>
    </Container>
    <div className="lg:flex lg:justify-end">
      <StaticImage
        className="!block max-w-[1920px] mt-[-365px] mx-auto z-[-2] 3xl:mt-[-19.38vw] 2xl:mt-[-18.94vw] xl:mt-[-18.55vw] lg:min-w-[865px] lg:-mt-5 md:w-[767px] md:min-w-0 md:flex-shrink-0 md:mt-5 sm:w-[700px] sm:mt-[40px] xs:w-[550px]"
        src="../data-branching/images/illustration.jpg"
        alt=""
        loading="lazy"
        aria-hidden
      />
    </div>
  </section>
);

export default DataBranching;