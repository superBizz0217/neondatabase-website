import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';

import Input from 'components/shared/search/input';
import Results from 'components/shared/search/results';
import useAlgoliaSearch from 'hooks/use-algolia-search';
import algoliaQueries from 'utils/algolia-queries';

const indices = [{ name: algoliaQueries[0].indexName, title: 'Docs', hitComp: 'postPageHit' }];

const SearchModal = ({ isOpen, closeModal }) => {
  const { query, setQuery, setFocus, hasFocus, searchClient } = useAlgoliaSearch();
  const shouldShowResult = !!query?.length && hasFocus;
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <Configure clickAnalytics />

      <div
        className={clsx(
          isOpen ? 'block' : 'hidden',
          'fixed inset-0 z-[100] bg-gray-9 dark:bg-gray-1'
        )}
      >
        <div className="flex items-center space-x-4 border-b border-gray-7 bg-white px-4 py-2.5 dark:border-gray-3 dark:bg-gray-1">
          <Input
            className="grow"
            innerClassName="border active:border-secondary-8 dark:active:border-primary-1 hover:border-secondary-8 dark:hover:border-primary-1"
            hasFocus={hasFocus}
            inputRef={inputRef}
            isMobileSearch
            onFocus={() => setFocus(true)}
          />
          <button
            className="shrink text-sm font-semibold leading-tight text-secondary-8 dark:text-primary-1"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        {shouldShowResult ? (
          <Results indices={indices} type="mobile" />
        ) : (
          <span className="mt-3.5 block text-center text-xs leading-none text-gray-3">
            No recent searches
          </span>
        )}
      </div>
    </InstantSearch>
  );
};

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SearchModal;
