import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsObserver = 'IntersectionObserver' in window;
    const observed = new WeakSet();

    const revealImmediately = (element) => {
      if (element instanceof HTMLElement) {
        element.classList.add('revealed');
      }
    };

    const observer = !prefersReducedMotion && supportsObserver
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.08,
            rootMargin: '0px 0px -24px 0px'
          }
        )
      : null;

    const observeElement = (element) => {
      if (!(element instanceof HTMLElement) || observed.has(element)) {
        return;
      }

      observed.add(element);

      if (prefersReducedMotion || !observer) {
        revealImmediately(element);
        return;
      }

      if (element.getBoundingClientRect().top < window.innerHeight - 24) {
        revealImmediately(element);
        return;
      }

      observer.observe(element);
    };

    const scan = (root = document) => {
      root.querySelectorAll?.('[data-reveal]').forEach(observeElement);
      if (root instanceof HTMLElement && root.matches('[data-reveal]')) {
        observeElement(root);
      }
    };

    scan(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            scan(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);
}
