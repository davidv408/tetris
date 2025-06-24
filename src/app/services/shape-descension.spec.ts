import { TestBed } from '@angular/core/testing';

import { ShapeDescension } from './shape-descension';

describe('ShapeDescension', () => {
  let service: ShapeDescension;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeDescension);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
