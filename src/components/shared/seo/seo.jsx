import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import createMetaImagePath from 'utils/create-meta-image-path';

const SEO = ({
  pathname,
  canonicalUrl,
  title,
  description,
  ogImage,
  metaKeywords,
  metaRobotsNoindex,
  opengraphDescription,
  opengraphTitle,
  opengraphImage,
  facebook,
}) => {
  const {
    site: {
      siteMetadata: { siteTitle, siteDescription, siteUrl, siteImage, siteLanguage },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
        }
      }
    }
  `);
  const isRobotsNoindexPage = metaRobotsNoindex === 'noindex';
  const currentUrl = pathname !== '/' ? `${siteUrl}${pathname}` : siteUrl;
  const currentDescription = description || opengraphDescription || siteDescription;
  return (
    <Helmet
      title={title || siteTitle}
      htmlAttributes={{
        lang: siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      {/* General */}
      <meta name="description" content={currentDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      {isRobotsNoindexPage && <meta name="robots" content="noindex" />}
      {/* Open Graph */}
      <meta property="og:title" content={title || opengraphTitle || siteTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta
        property="og:image"
        content={createMetaImagePath(opengraphImage || ogImage, siteUrl) || siteUrl + siteImage}
      />
      <meta property="og:type" content="website" />
      {facebook && <meta property="fb:app_id" content={facebook.appId} />}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl || currentUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string,
  ogImage: PropTypes.shape({}),
  metaKeywords: PropTypes.string,
  metaRobotsNoindex: PropTypes.string,
  opengraphDescription: PropTypes.string,
  opengraphTitle: PropTypes.string,
  opengraphImage: PropTypes.shape({}),
  facebook: PropTypes.shape({
    appId: PropTypes.string,
  }),
};

SEO.defaultProps = {
  title: null,
  description: null,
  canonicalUrl: null,
  ogImage: null,
  metaKeywords: null,
  metaRobotsNoindex: null,
  opengraphDescription: null,
  opengraphTitle: null,
  opengraphImage: null,
  facebook: null,
};

export default SEO;
