export class BaseService {
  buildFilterOrderUrl(filter = '', orderby = ''): string {
    let url = '';
    if (filter.length > 0) {
      url += '?filter=' + filter;
    }

    if (orderby.length > 0) {
      if (url.length === 0) {
        url += '?orderby=' + orderby;
      } else {
        url += '&orderby=' + orderby;
      }
    }

    return url;
  }
}
