import React from 'react';
import { render } from '@testing-library/react';
import { getNoneLayout, getDefaultLayout } from './index';
import { describe, expect, test } from 'vitest';

describe('Layout Functions', () => {
    test('getNoneLayout returns the page without modification', () => {
        const page = <div>Test Page</div>;
        const result = getNoneLayout(page);
        const { container } = render(result);
        expect(container).toContainHTML('<div>Test Page</div>');
    });

    test('getDefaultLayout wraps the page in a div with class "h-min-screen"', () => {
        const page = <div>Test Page</div>;
        const result = getDefaultLayout(page);
        const { container } = render(result);
        expect(container.firstChild).toHaveClass('h-min-screen');
        expect(container).toContainHTML('<div>Test Page</div>');
    });
});